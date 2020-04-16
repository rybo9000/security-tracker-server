/* ADD COLUMNS TO STATUS TABLE */

ALTER TABLE status ADD COLUMN clientid INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE;

ALTER TABLE status ADD COLUMN securityitem INTEGER NOT NULL REFERENCES securityitems(id) ON DELETE CASCADE;

/* ADD COLUMNS TO SECURITYITEMS TABLE */

ALTER TABLE securityitems ADD COLUMN category INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE;