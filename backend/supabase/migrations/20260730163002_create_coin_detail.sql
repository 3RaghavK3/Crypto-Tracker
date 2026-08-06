create table coin_detail (
    coin_id varchar(255) primary key references coins(coin_id) on delete cascade,
    description text,
    categories text[],
    homepage text[],
    whitepaper text,
    twitter_username varchar(100),
    subreddit_url text,
    github_repositories text[],
    platforms jsonb,
    sentiment_votes_up_percentage decimal,
    sentiment_votes_down_percentage decimal,
    watchlist_portfolio_users bigint,
    developer_data jsonb,
    community_data jsonb,
    coingecko_last_updated timestamptz,
    last_synced_at timestamptz not null default now()
);
