import '@babel/polyfill';
import pool from './db';

const query = async (queryString) => {
	pool.on('connect', () => {
		console.log('connected to the db');
	});
	pool.query(queryString)
	.then((res) => {
		console.log(res);
		pool.end();
	})
	.catch((err) => {
		console.log(err);
		pool.end();
	});

	pool.on('remove', () => {
		console.log('client removed');
		process.exit(0);
	});
};

export default query;