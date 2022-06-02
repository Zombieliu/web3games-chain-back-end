import { EntityModel } from '@midwayjs/orm';
import {
  PrimaryGeneratedColumn,
} from 'typeorm';
import {pool_base_info} from "../abstract/pool_base_info";

@EntityModel()
export class SwapPool extends pool_base_info{

  @PrimaryGeneratedColumn()
  id: number;

}
