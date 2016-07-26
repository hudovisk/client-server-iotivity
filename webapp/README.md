How to run
==========

The webapp uses ReactJS. A more detailed guide to the stack used can be seen [here](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html).

If you dont have nodejs installed, run (read [this](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)):
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install project dependencies (make sure you are in the root folder of the webapp):
```
npm install
```

Install webpack globally (the development webserver):
```
npm install -g webpack-dev-server
```

To start the dev server, run (in the root folder of the webapp):
```
webpack-dev-server
```

The app can be viewed at http://localhost:8080/webpack-dev-server/



