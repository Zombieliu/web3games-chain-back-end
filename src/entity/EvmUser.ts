import { EntityModel } from '@midwayjs/orm';
import {
  Column,
  PrimaryColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@EntityModel()
export class EvmUser {
  @PrimaryColumn()
  address: string;

  @Column()
  ip: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @CreateDateColumn()
  create: number;

  @UpdateDateColumn()
  update: number;

  @VersionColumn()
  version: number;
}
