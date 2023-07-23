import server from "./server";
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
function Wallet({ privateKey, setPrivateKey, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    let address;
    if (privateKey) {
      try {
        address = toHex(secp256k1.getPublicKey(privateKey));
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } catch(ex) {
        setBalance(0);
      }
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet private key
        <input placeholder="Type a private key, for example: 313feab6a09d3711e051897bcb0b288756b650e8e0d5d190965a4739c9959a7a" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
