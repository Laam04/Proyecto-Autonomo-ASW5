# --- !Ups

CREATE TABLE loan (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  borrower_id BIGINT NOT NULL,
  amount DOUBLE NOT NULL,
  interest_rate DOUBLE NOT NULL,
  term_in_months INT NOT NULL,
  status VARCHAR(255) NOT NULL
);

# --- !Downs

DROP TABLE loan;
