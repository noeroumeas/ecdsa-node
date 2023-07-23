This project is part of the [Alchemy University Ethereum Developer Bootcamp]

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

You can transfer funds from an account using his associated private key to another account suing his public key. To ensure that the person trying to move the fund is the owner, a message is signed using the private key. Then the signed message is sent to the server that will check if the signed message is associated to the sender account. If the sender possess the funds and the signed message is correct, the funds will be sent. To ensure that a signed message can't be used again to process the same transaction again and again, a nonce representing the number of transaction done is included in the signed message.
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
