import { Router } from 'express';

import { requireToken } from '../auth/auth-controller';
import * as ResourceController from './resource-controller';

import sio from '../../index.js';

export default function() {
    var router = Router();

    router.get('/', 
        requireToken,
        (req, res, next) => {
            console.log(req.user);
            sio.to(String(req.user._id)).emit("discovery");
            ResourceController.getResourcesByUserId(req.user._id)
                .then((resources) => {
                    return res.status(200).json({resources});
                }, (reason) =>{
                    console.log(reason);
                    return res.status(500).end();
                });
        }
    );

    router.get('/:resource_id', 
        requireToken,
        (req, res, next) => {
            ResourceController.getResourcesById(req.params.resource_id)
                .then((resource) => {
                    sio.to(String(req.user._id)).emit("get", {identifier: resource.identifier});
                    return res.status(200).json({resource});
                }, (reason) =>{
                    console.log(reason);
                    return res.status(500).end();
                });
        }
    );

    router.put('/:resource_id', 
        requireToken,
        (req, res, next) => {
            ResourceController.getResourcesById(req.params.resource_id)
                .then((resource) => {
                    sio.to(String(req.user._id)).emit("put", {
                        identifier: resource.identifier,
                        attrs: req.body.attrs
                    });
                    return res.status(200).end();
                }, (reason) =>{
                    console.log(reason);
                    return res.status(500).end();
                });
        }
    );

    router.post('/:resource_id/observe', 
        requireToken,
        (req, res, next) => {
            ResourceController.getResourcesById(req.params.resource_id)
                .then((resource) => {
                    sio.to(String(req.user._id)).emit("observe", {
                        identifier: resource.identifier
                    });
                    return res.status(200).end();
                }, (reason) =>{
                    console.log(reason);
                    return res.status(500).end();
                });
        }
    );

    router.delete('/:resource_id/observe', 
        requireToken,
        (req, res, next) => {
            ResourceController.getResourcesById(req.params.resource_id)
                .then((resource) => {
                    sio.to(String(req.user._id)).emit("deobserve", {
                        identifier: resource.identifier
                    });
                    return res.status(200).end();
                }, (reason) =>{
                    console.log(reason);
                    return res.status(500).end();
                });
        }
    );

    return router;
}
