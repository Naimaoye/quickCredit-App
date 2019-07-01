import loans from '../models/loans';
import repayments from '../models/repayment';

class Repaymentcontroller {
    /**
    * post loan repayments for user
    *
    * @param {object} request express request object
    * @param {object} response express response object
    *
    * @returns {json} json
    *
    * @memberof RepaymentController
    */

  static async postRepayment(req, res) {
    try{
      const id = parseInt(req.params.id, 10);
      const paidAmount = parseFloat(req.body.paidAmount);
      const userLoan = await loans.getOneLoan(id);

      if(userLoan.rows.length > 0) {
        if (userLoan.rows[0].status !== 'approved') {
          return res.status(401).send({
            error: 'This loan has not yet been approved',
          });
        }
        if (userLoan.rows[0].repaid === true){
          return res.status(400).send({
          error: 'This loan has been repaid',
          });
        }
        if (paidAmount > userLoan.rows[0].balance) {
          return res.status(400).send({
          error: `The paid amount exceeds remaining balane! You only have # ${userLoan.rows[0].balance} left`,
        });
      }
      if (paidAmount <= userLoan.rows[0].balance) {
        userLoan.rows[0].balance -= paidAmount;

        const postPayment = await repayments.postLoan(id, paidAmount);
        const updateLoanBalance = await loans.updateUserBalance(userLoan.rows[0].balance, id);
        const updatedData = {
          id: updateLoanBalance.rows[0].id,
          loanId: postPayment.rows[0].loanId,
          createdOn: postPayment.rows[0].createdOn,
          amount: updateLoanBalance.rows[0].amount,
          monthlyInstallment: updateLoanBalance.rows[0].paymentInstallment,
          paidAmount,
          balance: updateLoanBalance.rows[0].balance,
        };

        if (userLoan.rows[0].balance === 0) {
          const repaid = true;

          await loans.setRepaid(repaid, userLoan.rows[0].balance);

          return res.status(201).send({
            data: {
              ...updatedData,
            }
          });
        }
       return res.status(201).send({
        data: {
          ...updatedData,
        },
       });
     }
   }
     return res.status(404).send({
      error: 'No Loan with this Id found',
     });
  } catch (error) {
    return res.status(500).json({
      error: 'Ops something broke',
    });
  }



}

/**
   * user can view repayment history
   *
   * @param {object} request express request object
   * @param {object} response express response object
   *
   * @returns [array] array
   *
   * @memberof RepaymentController
   */

  static async getRepaymentHistory(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const repaymentHistory = await repayments.findLoanId(id);
      const userEmail = await loans.findEmailByLoanId(id);
      
      if (req.user.email !== userEmail.rows[0].email) {
        return res.status(401).json({
          error: 'Email do not match! Enter the email you registered with',
        });
      }
      return res.status(200).send({
        data: repaymentHistory.rows,
      });
    } catch (error) {
      return res.status(404).send({
        error: 'No repayment record found',
      });
    }
  }
}

export default Repaymentcontroller;
