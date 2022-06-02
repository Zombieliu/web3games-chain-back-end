import {Controller, Get,Query} from '@midwayjs/decorator';
import {get_token_price_usd} from "../oracle";

@Controller('/api/oracle')

export class HomeController {


  @Get('/get_token_price_usd')
  async fungible_token(@Query() queryData) {
    const token_name:string = queryData.token_name;
    const result = await get_token_price_usd(token_name);
    return result;
  }
}

