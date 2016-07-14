How to run
==========

The cloud server is built using NodeJS with the ExpressJS framework. MongoDB is used as database to temporarily save the resources found.

Make sure you have NodeJS and MongoDB installed.

Then run:
```
npm install
npm start
```

To run the tests:
```
npm run test
```

The pm2 tool is used to automatically deploy the application to Amazon AWS.
Modify ecosystem.json to your system and then run:
```
pm2 deploy production setup
```

To deploy the app, run:
```
pm2 deploy production
```
