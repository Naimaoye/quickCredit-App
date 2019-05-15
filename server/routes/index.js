import { Router } from 'express';
import Usercontroller from '../controller/users_controller';
import Loancontroller from '../controller/loans_controller';
import Repaymentcontroller from '../controller/repayments_controller';
import Validator from '../middle_ware/validate';
import Authorize from '../middle_ware/authorize';

const {
  usersValidator,
  loginValidator,
  loanApprovalValidator,
  loanValidator,
  loanQueryValidator,
  loanRepaymentValidator,
  userId
} = Validator

const { 
  verifyUser,
  verifyAdmin
   } = Authorize

const {
    createUsers,
    loginUser,
    adminVerifyUser
} = Usercontroller

const {
    applyForLoan,
    loanApproval,
    getAllLoans,
    getSpecificLoan
} = Loancontroller

const {
    postRepayment,
    getRepaymentHistory,
} = Repaymentcontroller

const route = (app) => {
     //sign up a user
    app.post('/api/v1/auth/signup',usersValidator, createUsers);
     
     //sign in a user
    app.post('/api/v1/auth/signin',loginValidator, loginUser);

     //apply for loan
    app.post('/api/v1/loans', verifyUser, loanValidator, applyForLoan);

    //admin post repayment
    app.post('/api/v1/loans/:id/repayment', verifyAdmin, loanRepaymentValidator, userId, postRepayment);

    //admin verify user
    app.patch('/api/v1/users/:email/verify', verifyAdmin, adminVerifyUser);
    
    //admin accept or reject loan
    app.patch('/api/v1/loans/:id', verifyAdmin, loanApprovalValidator, userId, loanApproval);

     //admin get all loan repayment history
    app.get('/api/v1/loans/:id/repayments', verifyUser, userId, getRepaymentHistory);
     
     //admin get all loan applications
    app.get('/api/v1/loans', verifyAdmin, loanQueryValidator, getAllLoans);

    //admin get all loans that has been approved but not repaid
    app.get('/api/v1/loans?status=approved&repaid=false',loanQueryValidator, getAllLoans);

    app.get('/api/v1/loans?status=approved&repaid=true',loanQueryValidator, getAllLoans);

    //admin get all specific application
    app.get('/api/v1/loans/:id', verifyAdmin, userId, getSpecificLoan);
};



export default route;
 