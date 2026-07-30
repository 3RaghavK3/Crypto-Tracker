create table notifications (
    notification_id bigserial primary key,
    user_id bigint references users(user_id) on delete cascade,
    coin_id varchar(255) references coins(coin_id) on delete cascade,
    notification_type varchar(50) check(notification_type in ('price_above', 'price_below', 'price_surge', 'price_drop')),
    status varchar(50) check(status in ('pending', 'sent', 'failed')),
    created_at timestamptz
);
