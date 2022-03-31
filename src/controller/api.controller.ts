import { Inject, Controller, Post,Body,Get,Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import {SubUsersService} from "../service/subUser.service";
import {EvmUsersService} from "../service/evmUser.service";
import {EvmUserStruct, SubUserStruct} from "../interface";
import {check_evm_address, check_sub_address} from "../utils/chain";
import {ResponseBody} from "../utils/ResponseBody";
import {DevChainsService} from "../service/devchain.service";

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;


  @Inject()
  SubUsersService: SubUsersService;

  @Inject()
  EvmUsersService: EvmUsersService;

  @Inject()
  DevChainService: DevChainsService;

  @Get('/get_balance')
  async getUser(@Query() queryData) {
    const account:string = queryData.account;
    const data = await this.DevChainService.QueryBalance(account);
    return ResponseBody.success(
      data,
    );
  }

  @Post('/add_evm_address')
  async add_evm_address(@Body() input: EvmUserStruct) {
    const address_result = check_evm_address(input.address)
    if (address_result){
      const input_result = await this.EvmUsersService.saveUser(input);
      if (!input_result){
        return ResponseBody.error(
          'failed',
        );
      }else{
        return ResponseBody.success(
          'success',
        );
      }
    }else{
      return ResponseBody.error(
        'SameIp',
      );
    }
  }

  @Post('/add_sub_address')
  async add_sub_address(@Body() input: SubUserStruct) {
    const address_result = check_sub_address(input.address)
    if (address_result){
      const input_result = await this.SubUsersService.saveUser(input);
      if (!input_result){
        return ResponseBody.error(
          'failed',
        );
      }else{
        return ResponseBody.success(
          'success',
        );
      }
    }else{
      return ResponseBody.error(
        'SameIp',
      );
    }
  }
}
