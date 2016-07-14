import { expect }   from 'chai';
import * as jwt     from 'jsonwebtoken';

import { User }     from '../../api/users/user-model';
import * as AuthController  from '../../api/auth/auth-controller';

var savedUserData = {
    name: 'saved',
    email: 'validEmail@email.com',
    password: 'validPassword'
};

describe('Auth controller', () => {
    
    var savedUser = null;

    before( function(done) {
    // runs before all tests in this block
        savedUser = new User(savedUserData);
        savedUser.save(done);
        console.log("before");
    });

    after( function(done) {
    // runs after all tests in this block
        User.find({}).remove(done);
    });

    describe('getToken()', () => {
        it('return undefined to invalid login', () => {
            const email = "invalidEmail@email.com";
            const password = "invalidPassword";
            return AuthController.getToken(email, password)
                .then( (token) => {
                        expect(true).to.be.false;
                    }, (reason) => {
                        expect(reason).to.be.equal("Invalid login");
                    }
                );
        });

        it('return token to valid login', () => {
            const email = "validEmail@email.com";
            const password = "validPassword";

            return AuthController.getToken(email, password)
                .then( (token) => {
                        expect(token).to.be.not.empty;
                    }, (reason) => {
                        expect(true).to.be.false;
                    });
        });
    });

    describe('register()', () => {
        it('return message to invalid data', () => {
            const name = "";
            const email = "";
            const password = "";
            return AuthController.register({ name, email, password })
                .then( () => {
                        expect(true).to.be.false;
                    }, (reason) => {
                        expect(reason).to.be.equal("Invalid data");
                    }
                );
        });

        it('return message to duplicate email register', () => {
            const name = "validName";
            const email = savedUserData.email;
            const password = "validPassword";
            return AuthController.register({name, email, password})
                .then( () => {
                        expect(true).to.be.false;
                    }, (reason) => {
                        expect(reason).to.be.equal("Duplicate email");
                    }
                );
        });

        it('return success to valid data', () => {
            const name = "validName";
            const email = "validEmail2@email.com";
            const password = "validPassword";

            return AuthController.register({name, email, password})
                .then( () => { }, 
                    (reason) => {
                        expect(true).to.be.false;
                    });
        });
    });
});