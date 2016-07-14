import * as jwt  from 'jsonwebtoken';
import { User }  from './user-model';

var tokenSecret = process.env.TOKEN_SECRET || "thisIsSuperSecret";

export function getUserByEmail(email) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email })
          .exec(function(err, user) {
            if(err) {
              return reject(err);
            }

            return resolve(user);
          });
    });
}