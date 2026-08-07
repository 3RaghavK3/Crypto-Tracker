ALTER TABLE alert_coins
ADD CONSTRAINT alert_coins_coin_id_fkey
FOREIGN KEY (coin_id)
REFERENCES coins(coin_id)
ON DELETE CASCADE;
