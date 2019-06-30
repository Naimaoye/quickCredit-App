import db from '../migrations/db';


class Repayments {

    static findLoanId(id) {
        const queryText = 'SELECT * FROM repayments WHERE "loanId"=$1';
        const response = db.query(queryText, [id]); 

        return response;
    }

    static postLoans(id, amount) {
        const queryText = `INSERT INTO repayments("loanId", amount)
                             VALUES($1, $2) RETURNING *`;
        const response = db.query(queryText, [id, amount]);

        return response;
    }
}


export default Repayments;