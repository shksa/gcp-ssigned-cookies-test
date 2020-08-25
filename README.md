# User list server
## What it does
It's a simple NodeJS - Express server that returns a list of users from static data.
## How to make it work
Clone the repo, perform an `npm install` inside the directory and run `npm-start` to get the server running. Dump a list of users as a JSON inside the export of `users.js` file in the `data` directory. The server just returns the JSON you place here so you can technically use this as a simple JSON returning server!
## Why did I create it?
I do a lot of front-end development and many times the back-end APIs are just not ready for integration and testing. To get around that, I simply dump the mock JSON to this server and use it.
