DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS publisher CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS book_authors CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;


CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE publisher (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    country TEXT
);

CREATE TABLE authors (
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

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT CHECK (rating > 0 AND rating < 6),
    review VARCHAR(140) NOT NULL,
    reviewer_id BIGINT NOT NULL,
    FOREIGN KEY (reviewer_id) REFERENCES reviewers(id),
    book_id BIGINT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

CREATE TABLE book_authors (
  book_id BIGINT REFERENCES books(id),
  author_id BIGINT REFERENCES authors(id)
);
