import db from '../migrations/db';


/**
 * @exports Loans
 *
 * @class Loans
 */

class Loans {
    /**
 * @param {*} data
 *
 * @returns { object } user object
 */ 

   static applyForLoans(data) {
    try{
        const queryText = `INSERT INTO loans(
        email, "firstName", "lastName", status, tenor, amount, balance, interest, "paymentInstallment", repaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
        const {
            email, firstName, lastName, status,
            tenor, amount, balance, interest, paymentInstallment
            repaid 
        } = data;
        const values = [email, firstName, lastName,
        status, tenor, amount, balance, interest, 
        paymentInstallment, repaid];
        const response = db.query(queryText, values);

        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
   }

   /**
  * @param {*} email
  *
  * @returns { object } user object
  */

  static findLoansByEmail(email) {
    try {
      const queryText = 'SELECT * FROM loans WHERE email=$1';
      const response = db.query(queryText, [email]);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
  * @param {*} id
  *
  * @returns { object } user object
  */

  static findEmailByLoanId(id) {
    try {
      const queryText = 'SELECT email FROM loans WHERE id=$1';
      const response = db.query(queryText, [id]);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

   /**
  * @method getAll
  *
  * @description Finds and returns all loans in the database
  *
  * @returns {object} the loans details
  */
  static getAllLoans() {
    try {
      const queryText = 'SELECT * FROM loans';
      const response = db.query(queryText);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
  * @method getQueriedLoans
  *
  * @description Finds and returns all loans in the database  using specific queries
  *
  * @returns {object} the loans details
  */
  static getQueriedLoans(status, repaid) {
    try {
      const queryText = 'SELECT * FROM loans WHERE status=$1 AND repaid=$2';
      const response = db.query(queryText, [status, repaid]);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
 * @method getOneLoan
 *
 * @description Finds and returns a specific loan
 *
 * @returns {object} the loans details
 */
  static getOneLoan(id) {
    try {
      const queryText = 'SELECT * FROM loans WHERE id=$1';
      const response = db.query(queryText, [id]);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

 /**
 * @method approveLoan
 *
 * @description admin approves or rejects a loan
 *
 * @returns {object} the loans details
 */
  static approveLoan(status, id) {
    try {
      const queryText = 'UPDATE loans SET status=$1 WHERE id=$2 RETURNING id, amount, tenor, status, "paymentInstallment", interest';
      const response = db.query(queryText, [status, id]);

      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
* @method updateUserBalance

* @description updates user's balance

* @returns {object} the loans details
*/
  static updateUserBalance(balance, id) {
    const queryText = 'UPDATE loans SET balance=$1 WHERE id=$2  RETURNING *';
    const response = db.query(queryText, [balance, id]);

    return response;
  }

  /**
  * @param {*} data
  *
  * @returns { object } user object
  */

  static setRepaid(repaid, balance) {
    const queryText = 'UPDATE loans SET repaid=$1 WHERE balance=$2 ';
    const response = db.query(queryText, [repaid, balance]);

    return response;
  }
}
export default Loans;





