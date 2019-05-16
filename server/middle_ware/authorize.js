import Authenticate from './authenticate';


class Authorize {
    static verifyUser(req, res, next) {
        try {
            // const token = req.headers.authorization.split(' ')[1];
            // const decoded = Authenticate.verifyToken(token);
            const userMail = req.body.email;
            const check = userMail.endsWith('@quickcredit.com');

            if (!check) {
                return res.status(403).send({
                    status: 403,
                    error: 'You do not have access to this route',
                });
            }
            return next();
        } catch (e) {
            return res.status(401).send({
                status: 401,
                error: 'Invalid input',
            });
        }
    }

    static verifyAdmin(req, res, next) {
        try {
            // const token = req.headers.authorization.split(' ')[1];
            // const decoded =  Authenticate.verifyToken(token);
            const userMail = req.body.email;
            const check = userMail.endsWith('@quickcredit.com');

            if (check) {
                return next(); // res.status(403).send({
                //     status: 403,
                //     error: 'You cannot access this route',
                // });
            }
            // return next();
        } catch (e) {
            return res.status(401).send({
                status: 401,
                error: 'Invalid input',
            });
        }
    }
}


export default Authorize;
