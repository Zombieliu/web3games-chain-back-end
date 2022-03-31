import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import {EvmUser} from "../entity/EvmUser";
import { Repository } from 'typeorm';
import {EvmUserStruct} from "../interface";
import check_time from "../utils/time";
import {sent_evm_token} from "../chain/faucet";



@Provide()
export class EvmUsersService {
  @InjectEntityModel(EvmUser)
  usersModel: Repository<EvmUser>;

  async saveUser(EvmUserStruct: EvmUserStruct) {

    const save_user = async () =>{
      const user = new EvmUser();
      user.address = EvmUserStruct.address;
      user.ip = EvmUserStruct.ip;
      user.country = EvmUserStruct.country;
      user.city = EvmUserStruct.city;
      // save entity
      const userResult = await this.usersModel.save(user);
      return userResult
    }

    const update_user = async (version:number) =>{
      const user = new EvmUser();
      user.address = EvmUserStruct.address;
      user.ip = EvmUserStruct.ip;
      user.country = EvmUserStruct.country;
      user.city = EvmUserStruct.city;
      user.version = version + 1
      // save entity
      const userResult = await this.usersModel.save(user);
      return userResult
    }

    const ip_info = await this.usersModel.findOne({
      where: {
        ip: EvmUserStruct.ip,
      },
    });
    //check ip
    if (!ip_info){
      const user_info = await this.usersModel.findOne({
        where: {
          address: EvmUserStruct.address,
        },
      });
      //check user
      if (user_info){
        const time_result = check_time(user_info.update)
        if (time_result){
          //success add user
          await update_user(user_info.version)
          await sent_evm_token(user_info.address)
          return true
        }else{
          return false
        }
      }else{
        //success add user
        await save_user()
        await sent_evm_token(EvmUserStruct.address)
        return true
      }
    }else{
      return false
    }
  }
}
