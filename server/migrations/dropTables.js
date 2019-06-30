import query from './index';

const dropTables = 'DROP TABLE IF EXISTS users, loans, repayments CASCADE';

query(dropTables);