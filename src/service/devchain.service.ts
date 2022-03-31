import { Provide } from '@midwayjs/decorator';
import {check_balance} from "../chain/balance";
import BigNumber from 'bignumber.js';



@Provide()
export class DevChainsService {
  async QueryBalance(account: string ) {
    BigNumber.config({ DECIMAL_PLACES: 8 });
    const result:any = new BigNumber(await check_balance(account));
    const final_data = result.dividedBy('10000000000').toString();
    return final_data
  }
}
