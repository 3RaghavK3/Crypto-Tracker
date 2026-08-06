ALTER TABLE coin_detail
DROP COLUMN IF EXISTS hashing_algorithm,
DROP COLUMN IF EXISTS block_time_in_minutes,
DROP COLUMN IF EXISTS genesis_date,
DROP COLUMN IF EXISTS country_origin,
DROP COLUMN IF EXISTS blockchain_sites,
DROP COLUMN IF EXISTS official_forum_urls,
DROP COLUMN IF EXISTS chat_urls,
DROP COLUMN IF EXISTS announcement_urls,
DROP COLUMN IF EXISTS facebook_username,
DROP COLUMN IF EXISTS telegram_channel_identifier,
DROP COLUMN IF EXISTS bitbucket_repositories,
DROP COLUMN IF EXISTS detail_platforms;
