How to run
==========

The cloud server is built using NodeJS with the ExpressJS framework. MongoDB is used as database to temporarily save the resources found.

Make sure you have [NodeJS](https://nodejs.org/en/download/package-manager/) and [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition) installed.

Install the project dependencies:
```
npm install
```

To run the application:
```
npm start
```

To run the unit tests written in the test folder, run:
```
npm run test
```

The pm2 tool is used to automatically deploy the application to Amazon AWS.
This tool will automatically start your application and restart it whenever a crash happens.

Modify `ecosystem.json` with the user and host of your instance. Also configure the repo and the path.
Remember that the instance must have access permition to your git repo (SSH keys) and your host machine must have 
acces permition (SSH keys) to the instance.

To setup the folders and test the access run:
```
pm2 deploy production setup
```

To deploy the app, push your changes to the remote git repo and run:
```
pm2 deploy production
```
