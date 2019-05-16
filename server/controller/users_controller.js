import users from '../models/userss';
import bcrypt from 'bcryptjs';
import Auth from '../middle_ware/authenticate';

class Usercontroller {
    //get all the users
    static getUsers(req, res) {
    	try{
    		return res.status(200).json({
              message: 'All users successfully gotten',
              users,
              status: 200
    		});
    	}catch(e){
    		return res.status(500).json({
    			message: 'An error occured',
    		});
    	}
        
    }

static createUsers(req, res) {

   const {
     email, firstName, lastName, address,
     } = req.body;


    const isAdmin = false;

     const token = Auth.generateToken({
             email,
             isAdmin
         });

   const newUser = {
    id: users.length + 1,
    token,
    ...req.body,
    status: 'unverified',
    isAdmin,
    registered: new Date(),
  };

   const emailExists = users.find(user => user.email === email);
  if (emailExists) {
      return res.status(409).json({
        status: 409,
        error: 'User already exist',
      });
    }

  users.push(newUser);
  return res.status(201).json({
   message: 'successfully created a user',
   status: 201,
   newUser,
   });
    
}
 
  
    static loginUser(req, res) {

     const { email, password } = req.body;
    // checks if user exists
    const emailExists = users.find(user => user.email === email);

    if(!emailExists && !Auth.comparePassword(emailExists.password, password)
     || !emailExists && Auth.comparePassword(emailExists.password, password)
     || emailExists && !Auth.comparePassword(emailExists.password, password)){
      return res.status(404).json({
        status: 404,
        error: 'user not found',
      });
    }
     
      return res.status(200).json({
      status: 200,
      data: {
        token: emailExists.token,
        id: emailExists.id,
        firstName: emailExists.firstName,
        lastName: emailExists.lastName,
        isAdmin: emailExists.isAdmin,
        email: emailExists.email,
      },
    });

    }

    static adminVerifyUser(req, res) {

    const { email } = req.params;
    const usersdata = users.find(user => user.email === email);
    
    if (!usersdata) {
      return res.status(404).send({
        status: 404,
        error: 'User not found!',
      });
    }

    if (usersdata.status === 'verified') {
      return res.status(409).json({
        status: 409,
        message: 'User has been verified',
      });
    }
     if(usersdata.status === 'not verified'){
      return res.status(401).json({
        status: 401,
        message: 'User has not been verified',
      });
     }

    usersdata.status = 'verified';
    const changedData = {
      email: usersdata.email,
      firstName: usersdata.firstName,
      lastName: usersdata.lastName,
      address: usersdata.address,
      status: usersdata.status,
      isAdmin: usersdata.isAdmin,
    };
    return res.status(200).json({
      status: 200,
      data: changedData,
    });

}


}
// module.exports = userController;
export default Usercontroller;
