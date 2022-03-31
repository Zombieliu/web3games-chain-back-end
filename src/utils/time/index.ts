
const get_time = 86400;

const check_time = (start_time:number) =>{
  const start = new Date(start_time).getTime();
  const end = new Date().getTime();
  const milliseconds: any = Math.abs(end - start).toString();
  const seconds = parseInt(String(milliseconds / 1000));
  if (seconds > get_time) {
    return true;
  } else {
    return false;
  }
}

export default check_time
