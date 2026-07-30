create table alert_coins (
    alert_id bigserial primary key,
    user_id bigint references users(user_id) on delete cascade,
    coin_id varchar(255) references coins(coin_id) on delete cascade,
    price_above decimal(20,8),
    price_below decimal(20,8),
    created_at timestamptz
);
