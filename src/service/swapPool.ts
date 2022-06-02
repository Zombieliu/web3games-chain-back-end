import {Provide} from "@midwayjs/decorator";
import {InjectEntityModel} from "@midwayjs/orm";
import {Repository} from "typeorm";
import { SwapPool } from "../entity/SwapPool";
import {SwapPoolDetails} from "../entity/SwapPoolDetails";

@Provide()
export class swapPool {
  @InjectEntityModel(SwapPool)
  poolModel: Repository<SwapPool>;

  @InjectEntityModel(SwapPoolDetails)
  poolDetailModel: Repository<SwapPoolDetails>;

  async swap_pools(pages) {
    const result = await this.poolDetailModel.createQueryBuilder(pages)
      .skip((pages-1)*5)
      .take((pages-1)*5+5)
      .getMany()
    return result
  }

  async swap_pools_all() {
    const result = await this.poolDetailModel.find({})

    return result
  }

  async swap_pools_details(pool_id) {
    const result = await this.poolDetailModel.findOne(
      {
        where:{
          pool_id
        }
      }
    )
    return result
  }


  async CreateNewPool(input_info){
    const pool = new SwapPoolDetails();
    pool.pool_id = input_info.pool_id;
    pool.assets_a = input_info.assets_a;
    pool.assets_b = input_info.assets_b;
    pool.assets_a_id = input_info.assets_a_id;
    pool.assets_b_id = input_info.assets_b_id;
    pool.assets_a_image_url = input_info.assets_a_image_url;
    pool.assets_b_image_url = input_info.assets_b_image_url;
    pool.assets_a_address =input_info.assets_a_address;
    pool.assets_b_address =input_info.assets_b_address;
    pool.volume_days =input_info.volume_days;
    pool.total_lp =input_info.total_lp;
    pool.your_lp =input_info.your_lp;
    pool.tvl = input_info.tvl;
    pool.volume = input_info.volume;
    const userResult = await this.poolDetailModel.save(pool);
    // save success
    return userResult


  }



}
