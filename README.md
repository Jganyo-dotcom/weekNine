

This repository contains a Node.js backend project developed  . It demonstrates how to set up a simple Express server, connect to MongoDB using environment variables, and manage dependencies with npm.




Code


  Requirements

- Node.js 
- npm
- MongoDB Atlas or local MongoDB instance



Installation

1. Clone the repository:

   git clone https://github.com/Jganyo-dotcom/weekNine.git
   cd weekNine
Install dependencies:


npm install
Copy .env.example to .env and update with your MongoDB credentials:


cp .env.example .env
Example:

Code
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.warsqwd.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=4001


 Running the Project
Start the server in development mode with file watching:

npm run dev

Or run normally:

bash
node server.js
The server will run on:

Code
http://localhost:4001
 Features
Express-based server setup

MongoDB connection via environment variables



Organized project structure (src/ folder for code)

 Scripts
Defined in package.json:

npm run dev → Run server with watch mode and warnings enabled

npm start → Run server normally

 Notes
Ensure your IP address is whitelisted in MongoDB Atlas.

Use the .env.example file as a template for your environment variables.

If you encounter querySrv ECONNREFUSED, double-check your MongoDB URI and Atlas cluster settings.

if you do as stated above then you shouldnt encouter any errors 

