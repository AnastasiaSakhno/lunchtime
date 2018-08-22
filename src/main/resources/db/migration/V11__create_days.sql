CREATE TABLE days (
  id BIGSERIAL PRIMARY KEY,
  date DATE,
  closed BOOL NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX days_date_uindex ON days (date);
