import pool from "../config/db.js";

export const addAlert = async (
  userId: number,
  coinId: string,
  type: string,
  price: number
) => {
  const query = `
    INSERT INTO alert_coins (user_id, coin_id, type, price, created_at)
    VALUES ($1, $2, $3, $4, NOW());
  `;
  await pool.query(query, [userId, coinId, type, price]);
};

export const updateAlert = async (
  userId: number,
  coinId: string,
  type: string,
  price: number
) => {
  const query = `
    UPDATE alert_coins
    SET price = $4
    WHERE user_id = $1 AND coin_id = $2 AND type = $3;
  `;
  const result = await pool.query(query, [userId, coinId, type, price]);
  return (result.rowCount ?? 0) > 0;
};

export const deleteAlert = async (
  userId: number,
  coinId: string,
  type: string
) => {
  const query = `
    DELETE FROM alert_coins
    WHERE user_id = $1 AND coin_id = $2 AND type = $3;
  `;
  const result = await pool.query(query, [userId, coinId, type]);
  return (result.rowCount ?? 0) > 0;
};

export const getAlertsForUser = async (userId: number) => {
  const query = `
    SELECT coin_id, type, price, created_at
    FROM alert_coins
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const processSatisfiedAlerts = async () => {
  const client = await pool.connect();
  
  await client.query("BEGIN");

  try {
    const { rows: alerts } = await client.query(`
      SELECT a.user_id, a.coin_id, a.type, a.price as target_price, c.current_price
      FROM alert_coins a
      JOIN coins c ON a.coin_id = c.coin_id
      WHERE
        (a.type = 'PRICE_ABOVE' AND c.current_price >= a.price)
        OR
        (a.type = 'PRICE_BELOW' AND c.current_price <= a.price)
    `);

    const insertedNotifications = [];

    for (const alert of alerts) {
      const res = await client.query(
        `INSERT INTO notifications
         (user_id, coin_id, notification_type, status, created_at)
         VALUES ($1, $2, $3, 'PENDING', NOW())
         RETURNING *`,
        [alert.user_id, alert.coin_id, alert.type]
      );
      if (res.rows.length > 0) {
        const notif = res.rows[0];
        notif.target_price = alert.target_price;
        notif.current_price = alert.current_price;
        insertedNotifications.push(notif);
      }
    }

    for (const alert of alerts) {
      await client.query(
        `DELETE FROM alert_coins
         WHERE user_id = $1
           AND coin_id = $2
           AND type = $3`,
        [alert.user_id, alert.coin_id, alert.type]
      );
    }

    await client.query("COMMIT");
    return insertedNotifications;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const updateNotificationStatus = async (notificationId: number, status: string) => {
  const query = `
    UPDATE notifications
    SET status = $2
    WHERE notification_id = $1
  `;
  await pool.query(query, [notificationId, status]);
};
