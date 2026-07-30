create table coins (
    coin_id varchar(255) primary key,
    symbol varchar(50),
    name varchar(255),
    image_url text,
    current_price decimal,
    market_cap bigint,
    market_cap_rank int,
    total_volume bigint,
    circulating_supply decimal,
    price_change_1h decimal,
    price_change_24h decimal,
    price_change_7d decimal,
    sparkline_7d jsonb,
    last_synced_at timestamptz
);
