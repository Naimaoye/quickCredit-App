import '@babel/polyfill';
import query from './index';

const createTables = `
CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY NOT NULL,
"firstName" VARCHAR(50) NOT NULL,
"lastName" VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(128) NOT NULL,
address TEXT NOT NULL,
status VARCHAR(15) NOT NULL CHECK(status IN ('verified', 'unverified')) DEFAULT 'unverified',
"isAdmin" BOOLEAN NOT NULL DEFAULT false

);

CREATE TABLE IF NOT EXISTS loans(
 id SERIAL NOT NULL PRIMARY KEY,
 email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
 "firstName" VARCHAR(50) NOT NULL,
 "lastName" VARCHAR(50) NOT NULL,
 amount NUMERIC NOT NULL CHECK(10000 <= amount),
 tenor NUMERIC NOT NULL CHECK(0 < tenor AND tenor <= 12),
 "paymentInstallment" NUMERIC NOT NULL,
 status VARCHAR(15) NOT NULL CHECK(status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
 repaid BOOLEAN NOT NULL DEFAULT false,
 balance NUMERIC NOT NULL,
 interest NUMERIC NOT NULL,
 "createdOn" TIMESTAMP NOT NULL DEFAULT NOW()
 );

CREATE TABLE IF NOT EXISTS repayments(
  id SERIAL NOT NULL PRIMARY KEY,
  "loanId" INT NOT NULL REFERENCES loans(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK(amount > 0),
  "createdOn" TIMESTAMP NOT NULL DEFAULT NOW()
 );
`;
query(createTables);