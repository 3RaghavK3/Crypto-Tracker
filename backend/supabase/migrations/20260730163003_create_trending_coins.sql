create table trending_coins (
    coin_id varchar(255) primary key references coins(coin_id) on delete cascade,
    trend_rank int,
    score int,
    last_synced_at timestamptz
);
