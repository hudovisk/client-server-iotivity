
import { Resource } from './resource-model';

export function registerResource(userId, resourceData) {
    return new Promise(function(resolve, reject) {
        resourceData.owner = userId;
        console.log(resourceData);
        var resource = new Resource(resourceData);
        resource.save(function(err) {
            if(err) {
                if(err.code === 11000) {
                    Resource.update({identifier: resourceData.identifier}, {
                        attrs: resourceData.attrs,
                        uri: resourceData.uri,
                        host: resourceData.host
                    }, (err, numOfAffected) => {
                        if(err) return reject(err);
                        if(numOfAffected <= 0) {
                            return reject("No resources found");
                        }
                        return resolve();
                    });
                }
                else {
                    return reject(err);
                }
            }
            return resolve();
        });
    });
}

export function getResourcesByUserId(userId) {
    return new Promise(function(resolve, reject) {
        Resource.find({owner: userId})
            .exec(function(err, resources){
                if(err) return reject(err);
                return resolve(resources);
            });
    });
}

export function getResourcesById(resourceId) {
    return new Promise(function(resolve, reject) {
        Resource.findById(resourceId)
            .exec(function(err, resource){
                if(err) return reject(err);
                if(!resource) return reject("Not found");
                return resolve(resource);
            });
    });
}

export function deregisterAllResources(userId) {
    return new Promise(function(resolve, reject) {
        Resource.find({owner: userId})
            .remove().exec(function(err) {
                if(err) return reject(err);
                return resolve();
            });
    });
}