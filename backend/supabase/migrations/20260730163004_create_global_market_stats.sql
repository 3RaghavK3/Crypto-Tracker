create table global_market_stats (
    id int primary key,
    total_market_cap decimal,
    total_volume_24h decimal,
    market_cap_change_percentage_24h decimal,
    active_cryptocurrencies int,
    last_synced_at timestamptz
);
