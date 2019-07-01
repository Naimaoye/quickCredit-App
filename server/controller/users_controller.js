import users from '../models/userss';
import Auth from '../middle_ware/authenticate';

class Usercontroller {
/**
    * create new user
    *
    * @param {object} request express request object
    * @param {object} response express response object
    *
    * @returns {json} json
    *
    * @memberof UserController
    */
  static async createUser(req, res) {
    try {
      const findUser = await users.findByEmail(req.body.email);

      if (findUser.rowCount > 0) {
        return res.status(409).json({
          error: 'User already exist',
        });
      }

      const response = await users.createUserData(req.body);
      const user = response.rows[0];
      const {
        id, firstName, lastName, email, status, address, isAdmin,
      } = user;
      const token = Auth.generateToken({
        id,
        email,
        isAdmin,
      });

      // send email to user
      

      return res.status(201).json({
        data: {
          token,
          id,
          firstName,
          lastName,
          email,
          status,
          address,
          isAdmin,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops something went wrong!',
      });
    }
  }


/**
  * log  user in
  *
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  *
  * @memberof UserController
  */
  
    static async loginUser(req, res) {
        try{
          const { email, password } = req.body;
          const response = await users.findByEmail(email);

          if(response.rowCount === 0) {
            return res.status(404).json({
              error: 'User with this email does not exist',
            });
          }

          const verifiedPassword = Auth.comparePassword(response.rows[0].password, password);
        if (!verifiedPassword) {
          return res.status(400).json({
            error: 'Invalid password or email',
          });
        }
         
         const {
           id, firstName, lastName, isAdmin
         } = response.rows[0];

         const token = Auth.generateToken({
          id,
          email,
          isAdmin
         });

         return res.status(200).json({
          data: {
            token,
            id,
            email,
            firstName,
            lastName,
            isAdmin
          },
         });

        }catch (error) {
          return res.status(500).json({
            error: 'Ops! something broke',
          });
        }
    }

    
    /**
  * check if a user is verified
  *
  * @param {object} request express request object
  * @param {object} response express response object
  *
  * @returns {json} json
  *
  * @memberof UserController
  */

    static async adminVerifyUser(req, res) {
     try{
      const { email } = req.params;
      const response = await users.findByEmail(email);

      if (!response.rows[0]) {
        return res.status(404).json({
          error: 'User with the email not found',
        });
      }

      if (response.rows[0].status === 'verified') {
        return res.status(409).json({
          error: 'User has already been verified',
        });
      }
      
      await users.verifyUser(email);

      const updatedData = await users.findByEmail(email);
      const {
        firstName, lastName, address, status
      } = updatedData.rows[0];
      const data = {
        email: updatedData.rows[0].email,
        firstName,
        lastName,
        address,
        status
      };

      return res.status(200).json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ops! something broke',
      });
  }
}


}

export default Usercontroller;

