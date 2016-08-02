How to run
==========

The cloud server is built using NodeJS with the ExpressJS framework. MongoDB is used as database to temporarily save the resources found.

Tested on Ubuntu 14.04

First run `sudo apt-get update`.


## Install NGINX
```
sudo apt-get install nginx
```

## Install NodeJS
See [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions). 
Command used:
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

## Install MongoDB
See [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition).
Commands used:
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Install Global tools used.
```
sudo apt-get install git
sudo npm install -g pm2 webpack babel-cli
```

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
