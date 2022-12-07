# React Admin Oauth Demo

This piece of the application allows us to imitate the OAuth flow.

## Stack
*  [ExpressJS](https://expressjs.com/en/starter/basic-routing.html) - Routing
*  [Axios](https://github.com/axios/axios) - Http requests
* [Nodemon](https://nodemon.io/) - Hot reloads
* [Dotenv](https://github.com/motdotla/dotenv#readme) - Environment variable support.

## Setup
You will need to populate a .env file in the api directory of this project.

```
OIDC_ISSUER=https://accounts.google.com/
OIDC_REDIRECT_URI=https://localhost:3000
OIDC_CLIENT_ID=<your OAuth client id>
OIDC_CLIENT_SECRET=<your OAuth client secret>
PORT=<the port you want this to run on>
```

## Install

Run ```npm install```. Once the install has taken place run ```npm start``` you should see a console message saying 'listening on <port defined in .env>'.

## Usage

Navigate to http://localhost:3001/resource the server should  respond:

```{"data":[{"id":"id","name":"resource","date":"2020-06-05T15:57:53.720Z"}],"total":1}```

Your server should now be available to use with the app (react admin UI) piece of this project.

