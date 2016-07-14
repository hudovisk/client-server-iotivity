import * as jwt  from 'jsonwebtoken';
import { User }  from './../users/user-model';

var tokenSecret = process.env.TOKEN_SECRET || "thisIsSuperSecret";

export function getToken(email, password) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email })
          .select('+password')
          .exec(function(err, user) {
            if(err) {
              return reject(err);
            }
            if(!user || !user.comparePassword(password)) {
              return reject("Invalid login");
            }

            var token = jwt.sign({_id: String(user._id), name: user.name, email: user.email}, tokenSecret, {
              expiresIn: "240h" //TODO(Hudo): Update this!
            });

            return resolve(token);
          });
    });
}

export function register(userData) {
    return new Promise(function(resolve, reject) {
        if(!userData.name) return reject("Invalid data");
        if(!userData.email) return reject("Invalid data");
        if(!userData.password) return reject("Invalid data");
        var user = new User(userData);
        user.save(function(err) {
            if(err) {
                if(err.code === 11000) return reject("Duplicate email");
            } else {
                return resolve();
            }
        });
        
    });
}

export function requireToken(req, res, next) {
    var token = req.get('Authorization');

    token = token.split(' ')[1];
    if (token) {
        jwt.verify(token, tokenSecret, function(err, decoded) {
            if (err) {
                return res.status(401).json({message: 'Failed to authenticate token.' });
            }

            req.user = decoded;
            next();
        });
    } else {
        return res.status(403).json({message: 'No token provided.'});
    }
}

export function checkToken(token, callback) {
    if (token) {
        jwt.verify(token, tokenSecret, function(err, decoded) {
            if (err) {
                return callback(err);
            }

            return callback(null, decoded);
        });
    } else {
        return callback("No token provided");
    }
}