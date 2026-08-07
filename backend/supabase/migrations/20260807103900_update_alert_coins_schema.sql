ALTER TABLE alert_coins DROP CONSTRAINT IF EXISTS alert_coins_pkey;
ALTER TABLE alert_coins DROP COLUMN IF EXISTS alert_id;
ALTER TABLE alert_coins DROP COLUMN IF EXISTS price_above;
ALTER TABLE alert_coins DROP COLUMN IF EXISTS price_below;

CREATE TYPE alert_type AS ENUM (
    'PRICE_ABOVE',
    'PRICE_BELOW'
);

ALTER TABLE alert_coins
ADD COLUMN type alert_type NOT NULL DEFAULT 'PRICE_ABOVE';

ALTER TABLE alert_coins
ALTER COLUMN type DROP DEFAULT;

ALTER TABLE alert_coins
ADD COLUMN price NUMERIC(20,8) NOT NULL DEFAULT 0;

ALTER TABLE alert_coins
ALTER COLUMN price DROP DEFAULT;

ALTER TABLE alert_coins
ADD PRIMARY KEY (user_id, coin_id, type);