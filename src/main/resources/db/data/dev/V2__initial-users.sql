-- password - admin
INSERT INTO users (email, password, full_name, role)
  VALUES
    ('admin@anadeainc.com', '$2a$12$6yiK4/ar7AfbL/VAjJd1M.u4SC5NHTwEvNfhCQLh.2ktmxUstEZJu', 'App Admin', 'ROLE_ADMIN'),
    ('test1@anadeainc.com', '$2a$12$6yiK4/ar7AfbL/VAjJd1M.u4SC5NHTwEvNfhCQLh.2ktmxUstEZJu', 'Иван Иванов', 'ROLE_REGULAR'),
    ('test2@anadeainc.com', '$2a$12$6yiK4/ar7AfbL/VAjJd1M.u4SC5NHTwEvNfhCQLh.2ktmxUstEZJu', 'Пётр Петров', 'ROLE_REGULAR');
