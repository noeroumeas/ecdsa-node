const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const accounts = {
  "03c900804b8bdd7f57e53a0d107cae6c2a93de48a41c18af6fe03e89132c08f761": {
    balance: 100,
    nonce: 0,
  },
  "029673a11e616b4a75df692b5e2e5a35b228236bb0f9821c058bda858a9d39095e": {
    balance: 50,
    nonce: 0,
  },
  "0226dadac1125e1583f0da4f2078d74430ea07b4ecd88d804de2d4561b0dc6a9ca": {
    balance: 75,
    nonce: 0,
  },
};

app.get("/nonce/:address", (req, res) => {
  const { address } = req.params;
  let nonce;
  if(!accounts[address]) {
    nonce = 0;
  } else {
    nonce = accounts[address].nonce || 0;
  }
  res.send({ nonce });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  let balance;
  if(!accounts[address]) {
    balance = 0;
  } else {
    balance = accounts[address].balance || 0;
  }
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, sig } = req.body;
  if(!accounts[sender] || !accounts[recipient]) {
    res.status(400).send({ message: "Invalid address!" });
  } else {
    if (accounts[sender].balance < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      const msg = new TextEncoder().encode(`${accounts[sender].nonce} transfer ${amount} to ${recipient}`);
      const isValid = secp256k1.verify(sig, msg, sender);
      if(!isValid) {
        res.status(400).send({ message: "Invalid signature!" });
      } else {
        accounts[sender].balance -= amount;
        accounts[recipient].balance += amount;

        res.send({ balance: accounts[sender].balance });
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});