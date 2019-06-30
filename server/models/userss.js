import Authenticate from '../middle_ware/authenticate';
import db from '../migrations/db';


class User {

    static createUserData(data) {
     try{
        const queryText = `INSERT INTO users(
         "firstName", "lastName", email, password, address) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
         const {
            firstName, lastName, email, password, address
         } = data;
         const hashedPassword = Authenticate.hashPassword(password);
         const values = [firstName, lastName, email, hashedPassword, address];
         const response = db.query(queryText, values);

         return response;
     }catch (error) {
        console.log(error);
        return false;
     }
    }

    static findByEmail(email) {
        try {
            const queryText = 'SELECT * FROM users WHERE email=$1';
            const response = db.query(queryText, [email]);
            return response;
        } catch (error) {
           console.log(error);
           return false; 
        }
    }

    static verifyUser(email){
        try{
            const queryText = "UPDATE users SET status='verified' WHERE email=$1";
            const response = db.query(queryText, [email]);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}

export default User;

