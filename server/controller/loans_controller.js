import loans from '../models/loans';
import users from '../models/userss';

class Loancontroller {
 
  /**
  * creates a loan application
  *
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  *
  * @memberof LoanController
  */

  static async loanApply(req, res) {
    try {
      const { tenor } = req.body;
      const amount = Number(req.body.amount.toFixed(3));
      const userData = await users.findByEmail(req.user.email);

      if (userData.rows.length < 1) {
        return res.status(404).send({
          error: 'User does not exist!',
        });
      }
      if (req.user.email !== userData.rows[0].email) {
        return res.status(401).json({
          error: 'Email do not match! Enter the email you registered with',
        });
      }
      if (userData.rows[0].status !== 'verified') {
        return res.status(401).json({
          error: 'User not verified. You cannot apply for a loan yet',
        });
      }

      const findUserLoan = await loans.findLoansByEmail(req.user.email);

      if (findUserLoan.rows.length === 0
        || findUserLoan.rows[findUserLoan.rows.length - 1].repaid === true) {
        const status = 'pending';
        const repaid = false;
        const interest = 0.05 * amount;
        const paymentInstallment = ((amount + interest) / tenor);
        const balance = paymentInstallment * tenor;
        const { email, firstName, lastName } = userData.rows[0];
        const loanApplication = {
          email,
          firstName,
          lastName,
          status,
          tenor,
          amount,
          balance,
          interest,
          paymentInstallment,
          repaid,
        };
        const response = await loans.applyForLoans(loanApplication);
        const newLoan = response.rows[0];
        return res.status(201).json({
          data: {
            ...newLoan,
          },
        });
      }
      return res.status(409).json({
        error: 'Already applied for a loan',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops something broke',
      });
    }
  }   

/**
     * gets all loan application
     *
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns[array] array
     *
     * @memberof LoanController
     */

  static async getAllLoans(req, res) {
    try {
      const { status } = req.query;
      let { repaid } = req.query;

      if (status && repaid) {
        repaid = JSON.parse(repaid);
        const queriedLoans = await loans.getQueriedLoans(status, repaid);

        if (queriedLoans.rows.length === 0) {
          return res.status(200).send({
            message: 'Loans not available',
          });
        }
        return res.status(200).send({
          data: queriedLoans.rows,
        });
      }

      const allLoans = await loans.getAllLoans();

      if (allLoans.rows.length === 0) {
        return res.status(200).send({
          message: 'Loans not available',
        });
      }

      return res.status(200).send({
        data: allLoans.rows,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops something broke',
      });
    }
  }

/**
     * gets specific application
     *
     * @param {object} request express request object
     * @param {object} response express response object
     *
     * @returns {json} json
     *
     * @memberof LoanController
     */

  static async getOneLoan(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const specificLoan = await loans.getOneLoan(id);


      if (specificLoan.rows.length === 0) {
        return res.status(404).send({
          error: 'No Loan with that id exist',
        });
      }

      return res.status(200).send({
        data: specificLoan.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops something broke',
      });
    }
  }

  /**
      * approves users loan
      *
      * @param {object} request express request object
      * @param {object} response express response object
      *
      * @returns {json} json
      *
      * @memberof LoanController
      */
 static async approveLoan(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;
      const userLoan = await loans.getOneLoan(id);

      if (userLoan.rows.length === 0) {
        return res.status(404).send({
          error: 'Loan with that id not found',
        });
      }
      if (userLoan.rows[0].status === 'approved') {
        return res.status(409).send({
          error: 'Loan already approved',
        });
      }
      if (userLoan.rows[0].status === 'rejected') {
        return res.status(409).send({
          error: 'Loan already rejected',
        });
      }

      const updatedLoan = await loans.approveLoan(status, id);
      const {
        amount, tenor, paymentInstallment, interest,
      } = updatedLoan.rows[0];
      const updatedData = {
        loanId: updatedLoan.rows[0].id,
        amount,
        tenor,
        status: updatedLoan.rows[0].status,
        paymentInstallment,
        interest,
      };
     // const emailData = MessageHandler.loanApprovalMessage(updatedLoan.rows[0], userLoan.rows[0].email);

      //EmailHandler.sendNotif(emailData);

      return res.status(200).send({
        data: updatedData,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops something broke',
      });
    }
  }


}

export default Loancontroller;
