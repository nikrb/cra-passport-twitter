test branch to demonstrate wrong session.

Note we're running in production mode (one server), there is no dev mode.

# setup

1. clone repo and switch to local-prod-test branch
  * `git clone https://github.com/nikrb/cra-passport-twitter.git`
  * `cd cra-passport-twitter`
  * `git checkout local-prod-test`
2. copy .env.sample to .env (optionally provide your own mongo/twitter app credentials)
  * `cp .env.sample .env`
3. install client packages
  * `cd client`
  * `yarn` or `npm install`
4. install server packages (if install fails on node pre gyp, workaround is to install node-gyp first)
  * `cd ..`
  * `yarn` or `npm install`
5. build client
  * `cd client`
  * `yarn build` or `npm build`
6. run server
  * `cd ..`
  * `node server`
7. browse to localhost:5000

## view problem
1. click twitter login
2. authorize app
3. click authed? button
  * console displays user not authenticated

# Overview
This repo is a work in progress.
Uses [base template](https://github.com/nikrb/auth-react-base)
and adds in twitter auth using passport.

To get the anchor tag href link through to the back end specify the full url
and add the rel external attribute:
```
<a rel="external" href="http://localhost:5000/auth/login/twitter" >Login in with Twitter</a>
```

This works great with the development version, but not with the production version.
The difference is the dev version uses react-scripts to run webpack-dev-server on
port 3000 and the backend server runs on 5000. The production version just uses
one port (on 5000) and the rel external attribute doesn't seem to work as the
react-router-dom.BrowserRouter redirects us to the homepage using the cache app
(from service worker)

So far I can only get production to work by removing the service worker/registration.

TODO:
1. get it to work with the service worker of course
2. add the passport-local functionality back in
3. integrate the twitter login to work along side local login

# React Auth Base

create a base for react authentication

* node.js
* react.js
* react-router-dom (react-router v4)
* mongodb & mongoose
* passport.js (passport-local)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Following vlad's authentication [blog](https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt)

Heroku deployment taken from mars [demo](https://github.com/mars/heroku-cra-node)
with an updated version to show mongodb and websocket connection [here](https://github.com/nikrb/heroku-cra-node)

# setup

### install mongo
unixy:
```sudo apt-get install mongodb-org```

## development
1. clone repo
2. create .env file, e.g.
```
dbUri=mongodb://localhost:27017/testdb
jwtSecret=somesecretphrase
```
2. npm install (top level and client dirs)
3. startup mongo
4. npm run start-dev


## Deploy to Heroku

Create a new mongodb on mLab.

After creating the heroku app (```heroku create```) setup the environment using
the heroku dashboard.

```bash
git clone https://github.com/nikrb/auth-react-base.git
cd auth-react-base/
heroku create
git push heroku master
```
