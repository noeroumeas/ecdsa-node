import { useState } from "react";
import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    try {
      const amount = parseInt(sendAmount);
      const address = toHex(secp256k1.getPublicKey(privateKey));
      const { data: { nonce } } = await server.get(`nonce/${address}`);
      const msg = new TextEncoder().encode(`${nonce} transfer ${amount} to ${recipient}`);
      const sig = secp256k1.sign(msg, privateKey).toCompactHex();
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount,
        recipient,
        sig,
      });
      setBalance(balance);
    } catch (ex) {
      if(ex.response)
        alert(ex.response.data.message);
      else{
        console.log(ex);
        alert('Invalid private key or recipient address');
      }
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 029673a11e616b4a75df692b5e2e5a35b228236bb0f9821c058bda858a9d39095e"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
