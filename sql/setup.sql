DROP TABLE IF EXISTS reviewers, author, publisher, books;

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE publisher (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    country TEXT
);

CREATE TABLE author (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  dob DATE,
  pob TEXT
  -- adding relationship to book table
  -- book_id BIGINT,
  -- FOREIGN KEY (book_id) REFERENCES book(book_id)
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    publisher_id BIGINT REFERENCES publisher(id),
    released DATE,
    title TEXT
);

-- CREATE TABLE books (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     publisher_id BIGINT,
--     CONSTRAINT fkey_publisher
--     FOREIGN KEY (publisher_id) REFERENCES publisher(id),
--     released DATE,
--     title TEXT
-- );

