create a base for react authentication. [demo](https://knik-auth-react-base.herokuapp.com/)

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
