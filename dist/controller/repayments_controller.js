"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loans = _interopRequireDefault(require("../models/loans"));

var _repayment = _interopRequireDefault(require("../models/repayment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Repaymentcontroller =
/*#__PURE__*/
function () {
  function Repaymentcontroller() {
    _classCallCheck(this, Repaymentcontroller);
  }

  _createClass(Repaymentcontroller, null, [{
    key: "postRepayment",
    value: function postRepayment(req, res) {
      var id = parseInt(req.params.id, 10);

      var userLoan = _loans["default"].find(function (loan) {
        return loan.id === id;
      });

      if (!userLoan) {
        return res.status(404).send({
          status: 404,
          error: 'user loan not found!'
        });
      }

      var amountPaid = parseFloat(req.body.amountPaid);
      var balance = parseFloat(userLoan.balance) - amountPaid;

      if (userLoan && userLoan.status === 'approved') {
        if (amountPaid < userLoan.balance) {
          return res.status(400).send({
            status: 400,
            error: 'You need to complete your loan within the specified time'
          });
        }

        if (amountPaid > userLoan.balance) {
          return res.status(400).send({
            status: 400,
            error: 'You have overpaid, please check your balance'
          });
        }

        var updatedData = {
          id: id,
          loanId: id,
          createdOn: userLoan.createdOn,
          amount: userLoan.amount,
          monthlyInstallemnt: userLoan.paymentInstallment,
          amountPaid: amountPaid,
          balance: balance
        };

        if (userLoan.balance === 0) {
          userLoan.repaid = true;
          return res.status(200).send({
            status: 200,
            message: 'your loan has been fully repaid',
            data: updatedData
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          error: 'You do not have any loan history'
        });
      }
    }
  }, {
    key: "getRepaymentHistory",
    value: function getRepaymentHistory(req, res) {
      var id = req.params.id;

      var specificRepayment = _repayment["default"].find(function (repayment) {
        return repayment.id === parseInt(id, 10);
      });

      if (!specificRepayment.loanId) {
        return res.status(404).send({
          status: 404,
          error: 'Repayment history with the id is not found!'
        });
      }

      return res.status(200).send({
        status: 200,
        data: specificRepayment
      });
    }
  }]);

  return Repaymentcontroller;
}();

var _default = Repaymentcontroller;
exports["default"] = _default;