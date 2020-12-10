const { response } = require('express');
const express = require('express');
const usersMockData = require("../data/users");
const { createHmac } = require("crypto")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const server = express();

server.use(cookieParser('2Kwp3zllS5KfIfraj417ww=='))
// for parsing application/json
server.use(bodyParser.json()); 

// for parsing application/xwww-
server.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
server.use(upload.array()); 
server.use(express.static('public'));

Date.prototype.addHours = function(h) { 
  this.setTime(this.getTime() + 
               (h * 60 * 60 * 1000)); 
  return this; 
}

const links = `
  <a href="/product/sneakers/">sneakers</a>
  <a href="/product/watches/">watches</a>
  <a href="/about/">about</a>
`

server.get("/", (request, response) => {
    response.send(`
      <html>
        <form method="POST" action="/login">
          <label for="fname">First name:</label><br>
          <input type="text" id="fname" name="fname" value="John"><br>
          <input type="submit" value="login">
        </form>
      </html>
    `);
});

server.get("/product/sneakers", (request, response) => {
  console.log(`/product/sneakers handler, cookies ${JSON.stringify(request.cookies)}`)
  if (Object.keys(request.cookies).length === 0) {
    response.status(403).send('No cookie')
  } else {
    console.log(request.cookies)
    response.send(`
      <html>
        <head>
          <title>sneakers</title>
        </head>
        <body>
          <div>
            ${links}
          </div>
          <div>
            ${JSON.stringify({sneakers: usersMockData})}
          </div>
        </body>
      </html>
    `);
  }
    
});

server.get("/product/watches", (request, response) => {
  console.log(`/product/watches handler, cookies ${JSON.stringify(request.cookies)}`)
  if (Object.keys(request.cookies).length === 0) {
    response.status(403).send('No cookie')
  } else {
    response.send(`
      <html>
        <head>
          <title>watches</title>
        </head>
        <body>
          <div>
            ${links}
          </div>
          <div>
            ${JSON.stringify({watches: usersMockData})}
          </div>
        </body>
      </html>
    `);
  }
});

server.get("/about", (request, response) => {
  console.log(`/product/about handler, cookies ${JSON.stringify(request.cookies)}`)
  if (Object.keys(request.cookies).length === 0) {
    response.status(403).send('No cookie')
  } else {
    response.send(`
      <html>
        <head>
          <title>about</title>
        </head>
        <body>
          <div>
            ${links}
          </div>
          <div>
            ${JSON.stringify({about: usersMockData})}
          </div>
        </body>
      </html>
    `);
  }
});

// const experation = new Date("2021")

function signCookie(urlPrefix) {
  // Base64url encode the url prefix
  const urlPrefixEncoded = Buffer.from(urlPrefix)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const keyName = "signing-key"

  const now = new Date()

  const unixStamp = Math.round(now.addHours(2).getTime() / 1000)

  // Input to be signed
  const input = `URLPrefix=${urlPrefixEncoded}:Expires=${unixStamp}:KeyName=${keyName}`;

  // Create bytes from given key string.
  // const keyBytes = Buffer.from("2Kwp3zllS5KfIfraj417ww==", 'base64');

  // // Use key bytes and crypto.createHmac to produce a base64 encoded signature which is then escaped to be base64url encoded.
  // const signature = createHmac('sha1', keyBytes)
  //     .update(input)
  //     .digest('base64').replace(/\+/g, '-')
  //     .replace(/\//g, '_');

  // // Adding the signature on the end if the cookie value
  // const signedValue = `${input}:Signature=${signature}`;

  return input;
}

const noOfMilliSecondsIn2Hours = 2 * 60 * 60 * 1000

server.post("/login", (req, response) => {
  const name = req.body.fname
  if (name === 'John') {
    console.log('setting sneakers cookiee')
    response.cookie("Cloud-CDN-Cookie", signCookie("http://34.120.148.8/product/sneakers/"), {path: "/product/sneakers/", signed: true})
  } else {
    console.log('setting watches cookiee')
    response.cookie("Cloud-CDN-Cookie", signCookie("http://34.120.148.8/product/watches/"), {path: "/product/watches/", signed: true})
  }

  response.cookie("Cloud-CDN-Cookie", signCookie("http://34.120.148.8/about/"), {path: "/about/", signed: true})

  response.send(`
    <html>
      ${links}
    </html>
  `)
})

// , path: "/product/"

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server listening !`),
);

// Cloud-CDN-Cookie=URLPrefix%3DaHR0cDovLzM0LjEyMC4xNDguOC9wcm9kdWN0L3NuZWFrZXJz%3AExpires%3D1607550234%3AKeyName%3Dsigning-key%3ASignature%3DsfdT7kAXsTgFOqHV1hjQERitu3M%3D; Max-Age=7200; Domain=34.120.148.8; Path=/product/; Expires=Wed, 09 Dec 2020 21:43:54 GMT