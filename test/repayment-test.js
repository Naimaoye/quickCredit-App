
import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server/app';

chai.should();
chai.use(chaiHttp);

let token;

describe('Test loan repayment', () => {
  describe('POST /api/v1/loans/1/repayment', () => {
    const adminLogin = {
      email: 'adebayo@yahoo.com',
      password: 'password',
    };
    const amount = { paidAmount: 10000 };
    before((done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          token = loginRes.body.data.token;
        });
    done();
    });
    it('should show all loan applications', (done) => {
      chai
        .request(server)
        .post('/api/v1/loans/1/repayment')
        .set('authorization', token)
        .send(amount)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('paidAmount');
        });
        done();
    });
  });
});

