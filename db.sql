create table reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id INT NOT NULL REFERENCES restaurants(id),
name VARCHAR(50) NOT NULL,
review  TEXT NOT NULL,
rating INT NOT NULL check(rating >=1 and rating <=5)
);


