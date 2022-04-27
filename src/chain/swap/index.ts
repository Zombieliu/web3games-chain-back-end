import { ApiPromise, WsProvider } from '@polkadot/api';
import { BN } from '@polkadot/util';


function get_amount_out(amount_in: string,reserve_in:string,reserve_out:string) {
  const amount_in_with_fee = new BN (amount_in).mul(new BN('997'));
  const numerator = new BN(amount_in_with_fee).mul(new BN(reserve_out));
  const denominator = new BN(reserve_in).mul(new BN('1000')).add(amount_in_with_fee);
  const amount_out = numerator.div(denominator).toString();
  return amount_out;
}

const get_amounts_out = (id: string, amount_in: string, path: Array<string>,Reserves: [any, any]) => {
  const amounts = ['0',path.length];
  amounts[0] = amount_in;
  for (let i = 0;i<path.length -1;i++){
    const reserve_in = get_reserves(id,Number(path[i]),Number(path[i + 1]),Reserves)[0];
    const reserve_out = get_reserves(id,Number(path[i]),Number(path[i + 1]),Reserves)[1];
    amounts[i + 1] = get_amount_out(<string>amounts[i], reserve_in, reserve_out);
  }
  return amounts[1];
};

function sort_tokens(token_a: number, token_b: number) {
  if (token_a < token_b) {
    return [token_a, token_b];
  } else {
    return [token_b, token_a];
  }
}

function token_check(token_a: any, token_0: any, reserve_0: any, reserve_1: any){
  if (token_a == token_0 ){
    return [reserve_0, reserve_1];
  }
  else {
    return [reserve_1, reserve_0];
  }
}

function get_reserves(id:string, token_a: number, token_b: number,Reserves: [any, any]){
  const [token_0, _] = sort_tokens(token_a, token_b);
  const reserve_0 = Reserves[0];
  const reserve_1 = Reserves[1];
  const [reserve_a, reserve_b] = token_check(token_a,token_0,reserve_0,reserve_1);
  return [reserve_a, reserve_b];
}




async function swap_output(token_a_amount:string) {
  const provider = new WsProvider('ws://127.0.0.1:9944');
  // Create the API and wait until ready
  const api = await ApiPromise.create({
    provider,
  });
  const token_a = 1;
  const token_b = 2;
  const amount_in = token_a_amount;
  const path = ['1','2'];

  const pool_data = await api.query.exchange.getPool([token_a, token_b]);
  const pool = pool_data.toString();
  const reserves_data = await api.query.exchange.reserves(pool);
  const reserves = JSON.parse(reserves_data.toString());
  const result = get_amounts_out(pool,amount_in,path,reserves);
  return result;
}

export {
  swap_output
}
