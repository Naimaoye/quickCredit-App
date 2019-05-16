import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';



chai.should();

chai.use(chaiHttp);

let currentToken;

describe('Test user loan application', () => {
  describe('POST /loans', () => {
    const user = {
      email: 'doyin@email.com',
      password: 'password',
    };
    before((done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
        });
        done();
    });
    it('should successfully create loan for user', (done) => {
      const userLoan = {
        firstName: 'shewa',
        lastName: 'miracle',
        email: 'idris@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(201);
        });
    done();
    });
    it('should throw an error if user is not authenticated', (done) => {
      const userLoan = {
        firstName: 'shewa',
        lastName: 'miracle',
        email: 'idris@mail.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    done();
    });
    it('should throw an error if email is ommitted', (done) => {
      const userLoan = {
        firstName: 'shewa',
        lastName: 'miracle',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
        done();
    });
    it('should throw an error if firstName is ommitted', (done) => {
      const userLoan = {
        email: 'doyin@email.com',
        lastName: 'miracle',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
      done();
    });
    it('should throw an error if firstName is less than 3 characters', (done) => {
      const userLoan = {
        firstName: 'sh',
        lastName: 'miracle',
        email: 'doyin@email.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    done();
    });
    it('should throw an error if firstName is not a string', (done) => {
      const userLoan = {
        firstName: 1256,
        lastName: 'miracle',
        email: 'doyin@email.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
      done();
    });
    it('should throw an error if lastName is ommitted', (done) => {
      const userLoan = {
        email: 'doyin@email.com',
        firstName: 'shewa',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
      done();
    });
    it('should throw an error if lastName is less than 3 characters', (done) => {
      const userLoan = {
        lastName: 'mi',
        firstName: 'shewa',
        email: 'doyin@email.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
     done();
    });
    it('should throw an error if lastName is not a string', (done) => {
      const userLoan = {
        lastName: 12356,
        firstName: 'shewa',
        email: 'doyin@email.com',
        amount: 10000,
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    done();
    });
    it('should throw an error if amount is ommitted', (done) => {
      const userLoan = {
        email: 'doyin@email.com',
        firstName: 'shewa',
        lastName: 'miracle',
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    done();
    });
    it('should throw an error if amount is not a number', (done) => {
      const userLoan = {
        email: 'doyin@email.com',
        firstName: 'shewa',
        lastName: 'miracle',
        amount: 'twenty',
        tenor: 4,
      };
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
    done();
    });
  });
  describe('POST /loans', () => {
    const user = {
      email: 'doyin@email.com',
      password: 'password',
    };
    before((done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
        });
    done();
    });
    const userLoan = {
      firstName: 'shewa',
      lastName: 'miracle',
      email: 'doyin@email.com',
      amount: 10000,
      tenor: 4,
    };
    before((done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .send(userLoan)
        .set('token', currentToken)
        .end(() => done());
    });
    it('should throw an error if user applies for loan more than once', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('authorization', currentToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
      done();
    });
  });


  //Test for all loan applications
  describe('GET /api/v1/auth/signin', () => {
    const adminLogin = {
      email: 'adebayo@yahoo.com',
      password: 'password',
    };
    before((done) => {
      chai.request(server)
        .post( '/api/v1/auth/signin')
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
        });
    done();
    });
    it('should return all loan applications', (done) => {
      chai
        .request(server)
        .get('/api/v1/loans')
        .set('authorization', currentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
   done();
    });

    it('Should throw an error if user is not an admin', (done) => {
      const login = {
        email: 'doyin@email.com',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/auth/signin')
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
            });
        });
     done();
    });

    it('should return a single loan application', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/auth/signin/1')
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            });
        });
    done();
    });

    it('Should throw an error if loan id does not exist', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(adminLogin)
        .end((loginErr, loginRes) => {
          currentToken = `Bearer ${loginRes.body.data.token}`;
          chai
            .request(server)
            .get('/api/v1/auth/signin/10')
            .set('authorization', currentToken)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
            });
        });
     done();
    });
  });

});
