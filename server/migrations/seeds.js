import Authenticate from '../middle_ware/authenticate'
import query from './index';

const inserIntoTables = `
INSERT INTO users ("firstName", "lastName", email, password, address, status, "isAdmin")
VALUES ('Ade', 'doyin', 'doyin@email.com', '${Authenticate.hashPassword('password')}', 'cresent street', 'verified', false),
       ('james', 'john', 'adebayo@ware.ng', '${Authenticate.hashPassword('password')}', 'New york city', 'unverified', false),
       ('john', 'doe', 'adebayo@quickcredit.com', '${Authenticate.hashPassword('password')}', 'cresent city', 'verified', true)

INSERT INTO loans (email,"firstName","lastName", amount, tenor,"paymentInstallment", status, repaid, balance, interest)
  VALUES ('doyin@email.com','Ade','doyin',70000, 5, 14700, 'approved', false, 40000, 3500),
         ('adebayo@ware.ng','james','john',70000, 5, 14700, 'pending', false, 73500, 3500);

 INSERT INTO repayments ("loanId",amount)
  VALUES (1,4000.00),
         (2,4000.00);
`;
query(insertIntoTables);