import { Router } from 'express';

import * as AuthController from './auth-controller';

export default function() {
    var router = Router();

    router.post('/login', (req, res, next) => {
        console.log(req.body);
        AuthController.getToken(req.body.email, req.body.password)
            .then((token) => {
                if(token !== '')
                {
                    console.log(token);
                    return res.status(200).json({ token });
                }
            }, (reason) => {
                return res.status(403).json({ reason });
            });
    });

    router.post('/signup', (req, res, next) => {
        console.log(req.body);
        var userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        AuthController.register(userData)
            .then(() => {
                return res.status(200).end();
            }, (reason) => {
                return res.status(403).json({ reason });
            });
    });

    return router;
}
