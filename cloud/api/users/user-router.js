import { Router } from 'express';

import { requireToken } from '../auth/auth-controller';
import * as UserController from './user-controller';

export default function() {
    var router = Router();

    router.get('/me', 
        requireToken,
        (req, res, next) => {
            UserController.getUserByEmail(req.user.email)
                .then((user) => {
                    return res.status(200).json({me: user});
                }, (reason) => {
                    return res.status(500).json({reason});
                });
        }
    );

    return router;
}
