[backend-bookstore](https://alchemycodelab.github.io/backend-bookstore/)
========================================================================

Local Bookstore
===============

### Learning Objectives[](https://alchemycodelab.github.io/backend-bookstore/#learning-objectives)

-   Write a SELECT query that returns all rows from a SQL table
-   Write a UPDATE query that updates and returns particular rows in a SQL table
-   Write a INSERT query that creates and returns a row in a SQL table
-   Write a DELETE query that deletes a particular row in a SQL table
-   Write a CREATE query to create a SQL table with opinionated data types
-   Write a SELECT query that returns a sorted list of rows using ORDER BY
-   Write a SELECT query that returns a list of rows using GROUP BY
-   Write a SELECT query that returns the AVG of a set of rows for a numeric field
-   Create a table that uses field types: INT, BIGINT, BOOLEAN, TEXT, VARCHAR, DATE, TIME, TIMESTAMPZ, JSON
-   Create tables that utilize primary keys, foreign keys, and indexes
-   Create a table that has constraints using NOT NULL, UNIQUE, CHECK
-   Write a JOIN query to return relational data in two SQL tables
-   Model data that requires one-to-one, one-to-many, & many-to-many table relationships
-   Describe what a junction table is and when it's used
-   Write a SELECT query that JOINs two SQL tables via a junction table

### Description[](https://alchemycodelab.github.io/backend-bookstore/#description)

You've been hired by Bilbo's Books, a local bookstore that's in dire need of a better website. You've been assigned the task of building the store's backend, which includes a database & API. The database will contain books, book reviews, reviewers, publishers, and authors.

### Approach[](https://alchemycodelab.github.io/backend-bookstore/#approach)

Start by using the [backend-template](https://github.com/alchemycodelab/backend-template).

1.  Work vertically. That means build the tests, route and model for one entity/resource at a time. Horizontal would be building all the models first. Do not do that --- go vertical!
2.  Start with the entities/resources that don't depend on other resources: `Publisher`, `Author`, and `Reviewer`

### Models (Entities/Resources)[](https://alchemycodelab.github.io/backend-bookstore/#models-entitiesresources)

-   Publisher
-   Author
-   Book
-   Reviewer
-   Review

Database Schema Overview[](https://alchemycodelab.github.io/backend-bookstore/#database-schema-overview)
--------------------------------------------------------------------------------------------------------

> The term "schema" refers to the organization of data as a blueprint of how the database is constructed (divided into database tables in the case of relational databases). [Source](https://en.wikipedia.org/wiki/Database_schema)

A schema is what defines the structure of a database and its tables. For this database, the schema has been defined below, using the following syntax:

-   `<...>` is a placeholder for actual data.
-   `S` = string, `D` = date, `N` = number, `I` = BIGINT
-   Properties marked with `R` are required.
-   `id` property omitted for clarity.

### Publisher[](https://alchemycodelab.github.io/backend-bookstore/#publisher)

```
{
  name: <name-of-publisher RS>,
  city: <city S>
  state: <state S>
  country: <country S>
}

```

### Author (Many-to-Many with Book)[](https://alchemycodelab.github.io/backend-bookstore/#author-many-to-many-with-book)

```
{
  name: <name RS>,
  dob: <date-of-birth D>,
  pob: <place-of-birth S>
}

```

### Book (Many-to-Many with Author)[](https://alchemycodelab.github.io/backend-bookstore/#book-many-to-many-with-author)

```
{
  title: <title of book RS>,
  publisher: <publisher id RI>,
  released: <4-digit year RN>
}

```

### Reviewer[](https://alchemycodelab.github.io/backend-bookstore/#reviewer)

```
{
  name: <string RS>,
  company: <company or website name RS>
}

```

### Review[](https://alchemycodelab.github.io/backend-bookstore/#review)

```
{
  rating: <rating number 1-5 RN>,
  reviewer: <review id RI>
  review: <review-text, max-length 140 chars RS>,
  book: <book-id RI>
}

```

Routes[](https://alchemycodelab.github.io/backend-bookstore/#routes)
--------------------------------------------------------------------

Pick the set of routes that fit with your vertical slice.

#### GET[](https://alchemycodelab.github.io/backend-bookstore/#get)

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods.

##### `GET /publishers`[](https://alchemycodelab.github.io/backend-bookstore/#get-publishers)

```
[{ id, name }]

```

##### `GET /publishers/:id`[](https://alchemycodelab.github.io/backend-bookstore/#get-publishersid)

```
{ id, name, city, state, country, books: [{ id, title }] }

```

##### `GET /books`[](https://alchemycodelab.github.io/backend-bookstore/#get-books)

```
[{
    id, title, released,
    publisher: { id, name }
}]

```

##### `GET /books/:id`[](https://alchemycodelab.github.io/backend-bookstore/#get-booksid)

```
{
    title,
    released,
    publisher: { id, name },
    authors: [{ id, name }], // author id and name
    reviews: [{
        id,
        rating,
        review,
        reviewer: { id, name }
    ]
}

```

##### `GET /authors`[](https://alchemycodelab.github.io/backend-bookstore/#get-authors)

```
[{ id, name }]

```

##### `GET /authors/:id`[](https://alchemycodelab.github.io/backend-bookstore/#get-authorsid)

```
{
    name,
    dob,
    pob,
    books: [{
      id,
      title,
      released
    }]
}

```

##### `GET /reviewers`[](https://alchemycodelab.github.io/backend-bookstore/#get-reviewers)

```
[{
  id,
  name,
  company
}]

```

##### `GET /reviewers/:id`[](https://alchemycodelab.github.io/backend-bookstore/#get-reviewersid)

```
{
    id,
    name,
    company,
    reviews: [{
        id,
        rating,
        review,
        book: { id, title }
    }]
}

```

##### `GET /reviews`[](https://alchemycodelab.github.io/backend-bookstore/#get-reviews)

limit to 100 highest rated

```
[{
    id,
    rating,
    review,
    book: { id, title }
}]

```

#### POST/PUT[](https://alchemycodelab.github.io/backend-bookstore/#postput)

-   POST: Publishers, Books, Authors, Reviewers, and Reviews can be added.
-   PUT: Only Reviewers can be updated.

#### DELETE[](https://alchemycodelab.github.io/backend-bookstore/#delete)

Reviews and Reviewers However:

-   Reviewers cannot be deleted if there are reviews

### Acceptance Criteria[](https://alchemycodelab.github.io/backend-bookstore/#acceptance-criteria)

-   User can get a list of Publishers
-   User can get a list of Books
-   User can get a list of Authors
-   User can get a list of Reviewers
-   User can get a list of Reviews (limited to the top 100 highest rated)
-   User can get a single Publisher
-   User can get a single Book
-   User can get a single Author
-   User can get a single Reviewer
-   User can add a Publisher, Book, Author, Reviewer, and Review
-   User can update a Reviewer
-   User can delete a Reviewer if they don't have any reviews
-   End-to-end (E2E) tests exist for all the supported routes
-   API is deployed to Heroku

### Rubric[](https://alchemycodelab.github.io/backend-bookstore/#rubric)

| Task | Points |
| --- | --- |
| Models | 5 |
| Relationships | 5 |
| Routes | 5 |
| Tests | 3 |
| Project Organization | 2

 |


 ![pizza map](/PizzaBooks-ERD.png "MarineGEO logo")