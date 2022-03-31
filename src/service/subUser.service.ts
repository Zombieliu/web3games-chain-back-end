import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { SubUser } from '../entity/SubUser';
import { Repository } from 'typeorm';
import {SubUserStruct} from "../interface";
import {EvmUser} from "../entity/EvmUser";
import check_time from "../utils/time";
import {sent_sub_token} from "../chain/faucet";



@Provide()
export class SubUsersService {
  @InjectEntityModel(SubUser)
  usersModel: Repository<SubUser>;

  // save
  async saveUser(SubUserStruct: SubUserStruct) {

    const save_user = async () =>{
      const user = new EvmUser();
      user.address = SubUserStruct.address;
      user.ip = SubUserStruct.ip;
      user.country = SubUserStruct.country;
      user.city = SubUserStruct.city;
      // save entity
      const userResult = await this.usersModel.save(user);
      return userResult
    }

    const update_user = async (version:number) =>{
      const user = new EvmUser();
      user.address = SubUserStruct.address;
      user.ip = SubUserStruct.ip;
      user.country = SubUserStruct.country;
      user.city = SubUserStruct.city;
      user.version = version + 1
      // save entity
      const userResult = await this.usersModel.save(user);
      return userResult
    }

    const ip_info = await this.usersModel.findOne({
      where: {
        ip: SubUserStruct.ip,
      },
    });

    //check ip
    if (!ip_info){
      //check user
      const user_info = await this.usersModel.findOne({
        where: {
          address: SubUserStruct.address,
        },
      });
      if (user_info){
        const time_result = check_time(user_info.update)
        if (time_result){
          //success add user
          await update_user(user_info.version)
          await sent_sub_token(user_info.address)
          return true
        }else{
          return false
        }
      }else{
        //success add user
        await save_user()
        await sent_sub_token(SubUserStruct.address)
        return true
      }
    }else {
      return false
    }
  }
}
