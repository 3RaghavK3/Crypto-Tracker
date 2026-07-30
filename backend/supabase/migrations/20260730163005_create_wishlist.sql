create table wishlist (
    user_id bigint references users(user_id) on delete cascade,
    coin_id varchar(255) references coins(coin_id) on delete cascade,
    created_at timestamptz,
    primary key (user_id, coin_id)
);
