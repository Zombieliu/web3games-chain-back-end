import {Controller, Get, Inject, Query} from '@midwayjs/decorator';
import {fungible_token, fungible_token_balance} from "../chain/swap";
import {swapPool,} from "../service/swapPool";

@Controller('/api/token')

export class HomeController {
  @Inject()
  swapPool:swapPool

  @Get('/fungible_token')
  async fungible_token(@Query() queryData) {
    const token_id:string = queryData.token_id;
    const result = fungible_token(token_id);
    return result;
  }

  @Get('/fungible_token_balance')
  async fungible_token_balance(@Query() queryData) {
    const token_id:string = queryData.token_id;
    const address:string = queryData.address;
    const result = fungible_token_balance(token_id,address);
    return result;
  }

  // @Post('/batch_fungible_token')
  // async batch_fungible_token(@Query() queryData) {
  //   const token_id_array:Array<string> = queryData.token_id_array;
  //   console.log(token_id_array);
  //   // const result = fungible_token(token_id);
  //   // return result;
  // }
}

