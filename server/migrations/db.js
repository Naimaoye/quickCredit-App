import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	connectionString: process.env.NODE_ENV === 'test'
	? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});

export default pool;