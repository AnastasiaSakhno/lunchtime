CREATE TABLE menu_documents (
  id BIGSERIAL PRIMARY KEY,
  file_name VARCHAR(255),
  file_data BYTEA,
  uploaded_at DATE,
  user_id BIGINT,
  restaurant_id BIGINT,
  CONSTRAINT fk_menu_documents_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_menu_documents_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurants (id)
);
