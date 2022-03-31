import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';
import * as polkadotCryptoUtils from '@polkadot/util-crypto';

const check_sub_address = (address: string) =>{
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address),
      );
      return true;
    } catch (error) {
      return false;
    }
}

const check_evm_address = (address: string) =>{
  const evmaddress = polkadotCryptoUtils.isEthereumAddress(address);
  return evmaddress
}

const evm_address_to_sub_address = (address:string) => {
  const addressInput = address;
  const addressPrefix = 42;
  address = polkadotCryptoUtils.evmToAddress(addressInput, addressPrefix);
  return address;
}


export {
  check_sub_address,
  check_evm_address,
  evm_address_to_sub_address
}
