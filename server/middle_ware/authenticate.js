import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


dotenv.config();

class Authenticator {
    static generateToken(payload) {
        return jwt.sign(
            { payload },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '12h' }
        );
    }


    static verifyToken(token) {
        return jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );
    }

    static hashPassword(password) {
        return bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(10)
        );
    }

    static comparePassword(hashPassword, password) {
        return bcrypt.compareSync(
            password,
            hashPassword
        );
    }
}
export default Authenticator;
