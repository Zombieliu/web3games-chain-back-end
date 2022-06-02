import {
  Column, CreateDateColumn, UpdateDateColumn, VersionColumn,
} from 'typeorm';

export abstract class pool_base_info {

  @Column()
  pool_id:string;

  @Column()
  assets_a:string;

  @Column()
  assets_b:string;

  @Column()
  assets_a_id:string;

  @Column()
  assets_b_id:string;

  @Column()
  assets_a_image_url:string;

  @Column()
  assets_b_image_url:string;

  @Column()
  tvl:string;

  @Column()
  volume:string;

  @CreateDateColumn()
  create: number;

  @UpdateDateColumn()
  update: number;

  @VersionColumn()
  version: number;
}

