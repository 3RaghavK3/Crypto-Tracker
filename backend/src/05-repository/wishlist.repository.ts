import pool from "../config/db.js";

export const addWishlist = async (userId: number, coinId: string) => {
  const query = `
    INSERT INTO wishlist (user_id, coin_id, created_at)
    VALUES ($1, $2, NOW());
  `;
  await pool.query(query, [userId, coinId]);
};

export const removeWishlist = async (userId: number, coinId: string) => {
  const query = `
    DELETE FROM wishlist
    WHERE user_id = $1 AND coin_id = $2;
  `;
  const result = await pool.query(query, [userId, coinId]);
  return (result.rowCount ?? 0) > 0;
};

export const getWishlistForUser = async (userId: number) => {
  const query = `
    SELECT w.coin_id, w.created_at, c.name, c.symbol, c.current_price, c.price_change_percentage_24h
    FROM wishlist w
    JOIN coins c ON w.coin_id = c.coin_id
    WHERE w.user_id = $1
    ORDER BY w.created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
