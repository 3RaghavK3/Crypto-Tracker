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
