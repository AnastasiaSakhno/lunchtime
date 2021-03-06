CREATE TABLE menu (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  week_days VARCHAR(20),
  archive BOOL NOT NULL DEFAULT FALSE,
  restaurant_id BIGINT,
  CONSTRAINT fk_menu_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);

CREATE UNIQUE INDEX menu_email_uindex ON menu (name);
