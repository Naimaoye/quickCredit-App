import loans from '../models/loans';
import repayments from '../models/repayment';

class Repaymentcontroller {
   
  static postRepayment(req, res) {

    const id = parseInt(req.params.id, 10);
    const userLoan = loans.find(loan => loan.id === id);

    if (!userLoan) {
      return res.status(404).send({
        status: 404,
        error: 'user loan not found!',
      });
    }

    const amountPaid = parseFloat(req.body.amountPaid);
    const balance = parseFloat(userLoan.balance) - amountPaid;

    if(userLoan && (userLoan.status === 'approved')){
     
     if(amountPaid < userLoan.balance){
      return res.status(400).send({
          status: 400,
          error: 'You need to complete your loan within the specified time',
        });
     }
     
     if(amountPaid > userLoan.balance){
      return res.status(400).send({
          status: 400,
          error: 'You have overpaid, please check your balance',
        });
     }
    const updatedData = {
      id,
      loanId: id,
      createdOn: userLoan.createdOn,
      amount: userLoan.amount,
      monthlyInstallemnt: userLoan.paymentInstallment,
      amountPaid : amountPaid,
      balance: 0,
    };

    if (userLoan.balance === 0){
      userLoan.repaid = true;
      return res.status(200).send({
             status: 200,
             message: 'your loan has been fully repaid',
             data: updatedData,
            });
   }
}
else{
  return res.status(404).send({
      status: 404,
      error: 'You do not have any loan history',
    });
}

}

  static getRepaymentHistory(req, res) {
    const { id } = req.params;
    const specificRepayment = repayments.find(repayment => repayment.id === parseInt(id, 10));

    if (!specificRepayment.loanId) {
      return res.status(404).send({
        status: 404,
        error: 'Repayment history with the id is not found!',
      });
    }
    return res.status(200).send({
      status: 200,
      data: specificRepayment,
    });
  }
}

export default Repaymentcontroller;

