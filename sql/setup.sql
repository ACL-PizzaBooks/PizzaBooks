DROP TABLE IF EXISTS reviewers, author, publisher;

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

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    reviewer_id BIGINT REFERENCES reviewers(id),
    book_id BIGINT REFERENCES books(id)
)
