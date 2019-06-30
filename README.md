# MovieDatabase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.


## Prerequisites

There a couple of things that need to be installed to run the application.

### Install Node.js

The application requires [Node.js](https://nodejs.org/) to run.

```sh
$ sudo apt update
$ sudo apt install nodejs
```

Npm, Node.js package manager is also required.

```sh
$ sudo apt npm
```
### Install MongoDB

After installing Node.js, [MongoDB](http://www.mongodb.org) is required to be installed.

```sh
$ sudo apt update
$ sudo apt install -y mongodb
```
To verify the status of the server:

```sh
$ sudo systemctl status mongodb
```

To stop the server:

```sh
$ sudo systemctl stop mongodb
```

To start the server:

```sh
$ sudo systemctl start mongodb
```

### Install Angular

```sh
$ npm -g install @angular/cli
```

Downgrade Angular so that is compatible with Node.js v8.10.0:

```sh
$ npm -g install @angular/cli@1.6.8
```

Navigate to the moviedatabase directory and type:

```sh
$ npm install
```

### Import database

```sh
$ mongoimport --db moviesDB --collection movies --jsonArray movies.json
```
## Running the application

Navigate to the moviedatabase directory and type:

```sh
$ ng serve
```
Then, navigate to Back-End directory and type:

```sh
$ node app.js
```

Then, open the browser and type [http://localhost:4200/] and the application is running!

### Note
Login only works with google account.