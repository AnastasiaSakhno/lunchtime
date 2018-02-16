CREATE TABLE menu_documents (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(100),
  content OID,
  restaurant_id BIGINT NOT NULL,
  CONSTRAINT fk_projects_restaurant_documents_id_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);
