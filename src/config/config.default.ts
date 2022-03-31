import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1648288882537_103',
  koa: {
    port: 3004,
  },
  orm: {
    /**
     * 单数据库实例
     */
    type: 'postgres',
    host: 'pgm-3ns8ck0510ci7s311o.pg.rds.aliyuncs.com',
    port: 5432,
    username: 'henry',
    password: 'Liuhongqi321',
    database: "devnet-faucet",
    synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: true,
  },
  cors: {
    credentials: false,
  },
  jsonp: {
    callback: 'jsonp',
    limit: 512,
  },

} as MidwayConfig;

