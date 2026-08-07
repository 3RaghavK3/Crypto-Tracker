
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_notification_type_check;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_status_check;

CREATE TYPE notification_type_enum AS ENUM ('PRICE_ABOVE', 'PRICE_BELOW');
CREATE TYPE notification_status_enum AS ENUM ('PENDING', 'SENT', 'FAILED');

ALTER TABLE notifications 
  ALTER COLUMN notification_type TYPE notification_type_enum USING UPPER(notification_type)::notification_type_enum,
  ALTER COLUMN status TYPE notification_status_enum USING UPPER(status)::notification_status_enum;
