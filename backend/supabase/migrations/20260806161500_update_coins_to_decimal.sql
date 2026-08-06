ALTER TABLE coins 
ALTER COLUMN market_cap TYPE decimal,
ALTER COLUMN fully_diluted_valuation TYPE decimal,
ALTER COLUMN total_volume TYPE decimal,
ALTER COLUMN market_cap_change_24h TYPE decimal;

ALTER TABLE coins DROP COLUMN IF EXISTS market_cap_rank_with_rehypothecated;
