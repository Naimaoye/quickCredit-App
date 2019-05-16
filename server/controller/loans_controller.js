import loans from '../models/loans';

class Loancontroller {
   
  static applyForLoan(req, res) {
    const {
      email, firstName, lastName, amount, tenor,
    } = req.body;
    const loanId = loans.length + 1;
    const status = 'pending';
    const interest = 0.05;
    const paymentInstallment = parseFloat((amount * interest) / tenor).toFixed(2);
    const balance = parseFloat(amount).toFixed(2);
    const createdOn = new Date();
    const repaid = false;
    const data = {
      loanId,
      firstName,
      lastName,
      email,
      tenor,
      amount,
      paymentInstallment,
      status,
      balance,
      interest,
    };
    
    const updatedData = {
      id: data.loanId,
      user: data.email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };
    const loanExists = loans.find(loan => loan.user === email);
    if (loanExists) {
      return res.status(409).json({
        status: 409,
        error: 'user already applied for a loan',
      });
    }

    loans.push(updatedData);
    return res.status(201).json({
      status: 201,
      data,
    });
  }

  static getAllLoans(req, res) {

    const { status, repaid } = req.query;
    if (status && repaid) {
      const currentLoan = loans
        .filter(loan => loan.status === status && loan.repaid === JSON.parse(repaid));
      return res.status(200).send({
        status: 200,
        data: currentLoan,
      });
    }
    return res.status(200).send({
      status: 200,
      data: loans,
    });
  }

  static getSpecificLoan(req, res) {
    const { id } = req.params;
    const specificLoan = loans.find(loan => loan.id === parseInt(id, 10));
    if (!specificLoan) {
      return res.status(404).json({
        status: 404,
        error: 'loan application not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: specificLoan,
    });
  }

  static loanApproval(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const userLoan = loans.find(loan => loan.id === parseInt(id, 10));
    if (!userLoan) {
      return res.status(404).send({
        status: 404,
        error: 'user Loan does not exist',
      });
    }
    if (userLoan.status === 'approved') {
      return res.status(409).send({
        status: 409,
        error: 'Loan already approved',
      });
    }
    userLoan.status = status;
    const updatedData = {
      loanId: userLoan.id,
      loanAmount: userLoan.amount,
      tenor: userLoan.tenor,
      status: userLoan.status,
      monthlyInstallments: userLoan.paymentInstallment,
      interest: userLoan.interest,
    };
    return res.status(200).send({
      status: 200,
      data: updatedData,
    });
  }
}

export default Loancontroller;