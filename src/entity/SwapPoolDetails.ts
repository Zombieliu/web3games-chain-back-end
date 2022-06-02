import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {pool_base_info} from "../abstract/pool_base_info";

@EntityModel()
export class SwapPoolDetails extends pool_base_info{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assets_a_address:string;

  @Column()
  assets_b_address:string;

  @Column()
  volume_days:string;

  @Column()
  total_lp:string;

  @Column()
  your_lp:string;
}
