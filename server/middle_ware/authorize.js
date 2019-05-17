import Authenticate from './authenticate';


class Authorize {
    static verifyUser(req, res, next) {
             const bearerHeader = req.headers['authorization'];
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const decoded = Authenticate.verifyToken(req.token);
      console.log(decoded.payload.isAdmin);
      if (decoded.payload.isAdmin === false) {
                return res.status(403).send({
                    status: 403,
                    error: 'You do not have access to this route',
                });
            }
            
    }

static verifyAdmin(req, res, next) {
      const bearerHeader = req.headers['authorization'];
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const decoded = Authenticate.verifyToken(req.token);
      console.log(decoded.payload.isAdmin);
      if (decoded.payload.isAdmin === true) {
        next();
      }
      
      return res.status(401).send({
        status: 401,
        error: 'You cannot access this route',
      });
    }

}

export default Authorize;
