
export interface IUserOptions {
  uid: number;
  url: string;
}


export interface SubUserStruct {
  address:string;
  ip:string;
  country: string;
  city: string;
  create?: number;
  update?: number;
  version?: number;
}
export interface Pages {
  pages:number
}
export interface EvmUserStruct {
  address:string;
  ip:string;
  country: string;
  city: string;
  create?: number;
  update?: number;
  version?: number;
}
export interface swap_pools {
  pool_id:string;
  assets_a:string;
  assets_b:string;
  assets_a_id:string;
  assets_b_id:string;
  assets_a_image_url:string;
  assets_b_image_url:string;
  assets_a_address:string;
  assets_b_address:string;
  tvl:string;
  volume:string;
  volume_days:string;
  total_lp:string;
  your_lp:string;
}
