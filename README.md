# Notifications-Server
The Notification Server repo is meant to provide Worldbrain Admins to create and send notifications to their users.  In this case, users are those who have downloaded the chrome extension.  The notifications can then be viewed in their browser.

Examples of possible notifications could include system updates, security notices and general updates to Worldbrain users.   

The Notifications Server is a MERN stack web app using Mongo-Express-React and Node.  The Notifications API is a list of notifications in JSON format which can be viewed at [https://salty-fjord-43561.herokuapp.com/api/notifications]

Notifications are created and then posted and saved to a mongodb. On the front end, a react form posts new notifications to the database and the list maps all of the notifications.  A proxy API handles requests from the React app to the Node/Express server.  This is important because using a proxy ensures that we only need one port open, since Heroku doesn't allow multiple open ports to be deployed.

## Getting Started
The deployed webapp can be viewed at [https://salty-fjord-43561.herokuapp.com/]

## Installing
After cloning the repo from [https://github.com/WorldBrain/Notifications-Server] please add these dependences:

Express: framework to set up and handle requests to our Node.js Server
Body-Parser: parses incoming request bodies of new Notifications in JSON format
cors: allow cross-origin requests for GET & POST json data
Nodemon: automatically restarts server each time a file is saved
Mongoose: provides methods and schema to interact with mongodb.  Note use version 4.10.8 to avoid deprecation warnings with promises.st

Initialize the project:  
$ npm init -y  

Install using:  
$ npm i express body-parser cors nodemon mongoose --saved  

Start the server and express app:  
$ npm start  

## Testing routes
To create, read, update and delete notifications, using the routes specified in (./routes/api.js) we can use Postman.

## Viewing mongodb data
To interact with MongoDB, you can either use Robomongo or Studio 3t (download whichever is most convenient).  It should automatically connect with mongo and you can create view the Notifications collection

## Deploying
This project was created and deployed with Heroku.  First, the node server and mongo db were configured to show the notifications API.  The server and db were then deployed to Heroku.  In our heroku deploy commands, we also need a .gitignore file to ignore node_modules.

Deploy commands (after logging into Heroku):  
$ git init
$ echo node_modules > .gitignore  
$ git add .  
$ git commit -m "Initial Commit"  
$ heroku create  
$ git push heroku master  

Once deployed, a client folder for the front end react app is generated at the project's root directory.  The react app contains the react notification form and notification list components. These form saves new notifications to the database and API, and the list maps all of the notifications from the API.


cd to client folder:  
$ create-react-app client  

A proxy script in the package.json ensures that a proxy API handles requests from the React app to the server. To create a proxy API, we add a proxy key in client/ package.json:

"proxy": "http://localhost:4002"

After creating our react components, we then need to re-deploy the webapp. We want to check in our new client code, build create-react-app, install dependencies and production dependencies.  For this, we require the following post-build script in root package.json:

"scripts": {  
  "start": "node index.js",  
  "heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"  
}  

Then for the final deploy to Heroku:  
$ git add .  
$ git commit -m "ready to deploy react app"  
$ git push heroku master   
