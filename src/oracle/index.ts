import axios from "axios";

const get_token_price_usd = async (token_name:string) =>{
  const result = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: token_name,
      vs_currencies:'usd'
    }
  })
  return result.data
}

export {
  get_token_price_usd
}
