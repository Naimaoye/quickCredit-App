import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/app';

chai.should();

chai.use(chaiHttp);


describe('/POST user', () => {
    const firstUser = {
        id: 1,
        firstName: 'Ade',
        lastName: 'doyin',
        password: 'password',
        email: 'lola@email.com',
        address: 'cresent street',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'
    };
    const userErr = {
        id: 2,
        lastName: 'doyin',
        password: 'ibiyemi',
        email: 'oye@email.com',
        address: 'cresent street',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'
    };
    const noEmail = {
    	id: 3,
        firstName: 'Ade',
        lastName: 'doyin',
        password: 'ibiyemi',
        address: 'cresent street',
        status: 'verified',
        isAdmin: true,
        token: '7qnrdw1wundefinedundefined'
    };
    const usedEmail = {
        id: 4,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'james',
        lastName: 'john',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'
    };
    const noLastName = {
    	 id: 5,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'james',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'
    };
    const noPassword = {
        id: 6,
        email: 'adebayo@ware.ng',
        firstName: 'james',
        lastName: 'john',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'
    };
    const noAddress = {
        id: 7,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'james',
        lastName: 'john',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    const firstNameNotString = {
        id: 8,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 1234,
        lastName: 'john',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    const lastNameNotString = {
    	id: 9,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'james',
        lastName: 1234,
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    const firstNameMin = {
    	id: 10,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'ja',
        lastName: 'john',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    const lastNameNotMin = {
    	id: 11,
        email: 'adebayo@ware.ng',
        password: 'password',
        firstName: 'jam',
        lastName: 'jo',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    const passwordNotMin = {
    	id: 12,
        email: 'adebayo@ware.ng',
        password: 'pass',
        firstName: 'jam',
        lastName: 'jo',
        address: 'New york city',
        status: 'verified',
        isAdmin: false,
        token: '7qnrdw1wundefinedundefined'	
    }
    it('it should create a user successfully', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(userErr).end((err, res) => {
           res.status.should.be.eql(201);
           res.body.should.be.a('object');
       });
       done();
   });
    it('it should not create a user if firstname is not present', (done) => {
   		chai.request(server).post('/api/v1/auth/signup').send(userErr).end((err, res) => {
            res.status.should.be.eql(422);
            res.body.should.be.a('object');
        });
        done();
    });

    it('it should not create a user if lastName is not present', (done) => {
   		chai.request(server).post('/api/v1/auth/signup').send(noLastName).end((err, res) => {
            res.status.should.be.eql(422);
            res.body.should.be.a('object');
        });
        done();
    });

    it('it should throw a 422 error if email is not present', (done) => {
        chai.request(server).post('/api/v1/auth/signup').send(noEmail).end((err, res) => {
            res.status.should.be.eql(422);
            res.body.should.be.a('object');
        });
        done();
    });

    it('it should throw an error if the email has been used', (done) => {
        chai.request(server).post('/api/v1/auth/signup').send(usedEmail).end((err, res) => {
            res.status.should.be.eql(409);
            res.body.should.be.a('object');
        });
        done();
    });

    it('it should throw an error if the password field is empty', (done) => {
        chai.request(server).post('/api/v1/auth/signup').send(noPassword).end((err, res) => {
            res.status.should.be.eql(422);
            res.body.should.be.a('object');
        });
        done();
    });

    
     it('it should throw an error if the address field is empty', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(noAddress).end((err, res) => {
           res.status.should.be.eql(422);
           res.body.should.be.a('object');
        });
      done();
    });
     
     it('it should throw an error if the firstName is not a string', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(firstNameNotString).end((err, res) => {
           res.status.should.be.eql(422);
           res.body.should.be.a('object');
        });
        done();
    });
      
     it('it should throw an error if the lastName is not a string', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(lastNameNotString).end((err, res) => {
          res.status.should.be.eql(422);
           res.body.should.be.a('object');
        });
        done();
    });
     
     it('it should throw an error if the firstName is less than 3 characters', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(firstNameMin).end((err, res) => {
          res.status.should.be.eql(422);
          res.body.should.be.a('object');
        });
        done();
    });
     it('it should throw an error if the lastName is less than 3 characters', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(lastNameNotMin).end((err, res) => {
           res.status.should.be.eql(422);
           res.body.should.be.a('object');
        });
      done();
    });
     it('should throw an error if the password is less than 7 characters', (done) => {
      chai.request(server).post('/api/v1/auth/signup').send(passwordNotMin).end((err, res) => {
           res.status.should.be.eql(422);
           res.body.should.be.a('object');
        });
      done();
    });
});


 
//Test for users signin

describe('Testing users signin', () => {
  describe('POST /api/v1/auth/signin', () => {
    it('it should allow registered user sign in', (done) => {
      const user = {
        email: 'doyin@email.com',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        });
      done();
    });
    it('it should return 400 status if email is not correct ', (done) => {
      const inCorrectEmail = {
        email: 'azeezat@mail.com',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(inCorrectEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
        done();
    });
    it('it should return 400 status if password is not correct ', (done) => {
      const inCorrectPass = {
        email: 'doyin@mail.com',
        password: 'mypassword',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(inCorrectPass)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
        });
        done();
    });
    it('it should return 422 status if email field is empty', (done) => {
      const emptyEmail = {
      	email: "",
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(emptyEmail)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
        });
        done();
    });
  });
});


//admin verification
describe('Test for Admin mark user as verified', () => {
  describe('PATCH /api/v1/users/:email/verify', () => {
    it('should verify a user', (done) => {
      const Admin = {
        email: 'adebayo@yahoo.com',
        password: 'password',
      };
      const email = 'doyin@email.com';
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(Admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(server)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
            });
        });
        done();
    });
    it('should  throw an error if user email is not correct', (done) => {
      const admin = {
        email: 'wunmi@mail.com',
        password: 'password',
      };
      const email = 'doyin@email.com';
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(server)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
            });
        });
    done();
    });
    it('should  throw an error if its not admin that marked user as verified', (done) => {
      const notAdmin = {
        email: 'doyin@email.com',
        password: 'password',
      };
      const email = 'doyin@email.com';
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(notAdmin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line prefer-destructuring
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(server)
            .patch(`/api/v1/users/${email}/verify`)
            .set('authorization', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
            });
        });
    done();
    });
    it('should throw a 401 when no token is provided', (done) => {
      const Admin = {
        email: 'adebayo@yahoo.com',
        password: 'password',
      };
      const email = 'doyin@email.com';
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send(Admin)
        .end((loginErr, loginRes) => {
          // eslint-disable-next-line no-unused-vars
          const token = `Bearer ${loginRes.body.data.token}`;
          chai
            .request.agent(app)
            .patch(`/api/v1/users/${email}/verify`)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
            });
        });
    done();
    });
  });
});
 