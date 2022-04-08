import {ApiPromise,WsProvider} from "@polkadot/api";
import * as data from '../key/faucet.json';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair$Json } from '@polkadot/keyring/types';
import {evm_address_to_sub_address} from "../../utils/chain";



const Key: KeyringPair$Json = data as unknown as KeyringPair$Json;
const System_account = '5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT';



const sent_evm_token = async (evmaddress:string) =>{
  const provider = new WsProvider('wss://devnet.web3games.org');
// Create the API and wait until ready
  const api = await ApiPromise.create({
    provider,
    types: {
      Balance: 'u128'
    }
  });
// Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  const keyring = new Keyring({ type: 'sr25519' });
  const system = keyring.createFromJson(Key);
  system.unlock('WEB3GAMES321');
  const { nonce }: any = await api.query.system.account(System_account);

  const value = api.createType('Balance', '5000000000000000000');
  const address = evm_address_to_sub_address(evmaddress);
  const transfer = api.tx.balances.transfer(address, value);
  await transfer.signAndSend(system, { nonce }, ({ events = [], status }) => {
    console.log('Transaction status:', status.type);
    if (status.isInBlock) {
      console.log('Included at block hash', status.asInBlock.toHex());
    } else if (status.isFinalized) {
      console.log('Fixnalized block hash', status.asFinalized.toHex());
      return;
    }
  })
}


const sent_sub_token = async (sub_address:string) =>{
  const provider = new WsProvider('wss://devnet.web3games.org');
// Create the API and wait until ready
  const api = await ApiPromise.create({
    provider,
    types: {
      Balance: 'u128'
    }
  });
// Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version()
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  const keyring = new Keyring({ type: 'sr25519' });
  const system = keyring.createFromJson(Key);
  system.unlock('WEB3GAMES321');
  const { nonce }: any = await api.query.system.account(System_account);

  const value = api.createType('Balance', '5000000000000000000');
  const transfer = api.tx.balances.transfer(sub_address, value);
  transfer.signAndSend(system, { nonce }, ({ events = [], status }) => {
    console.log('Transaction status:', status.type);
    if (status.isInBlock) {
      console.log('Included at block hash', status.asInBlock.toHex());
    } else if (status.isFinalized) {
      console.log('Fixnalized block hash', status.asFinalized.toHex());
      return;
    }
  })
}
export {
  sent_evm_token,
  sent_sub_token
}

