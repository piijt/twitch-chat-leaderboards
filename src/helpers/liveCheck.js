import axios from "axios";

export default async function live_status(handle) {
  let html = (await axios.get(`https://cryptic-atoll-26953.herokuapp.com/https://www.twitch.tv/${handle.substring(1)}`))
    .data;
    console.log({r: html.includes('"isLiveBroadcast":true')})
  if (html.includes('"isLiveBroadcast":true')) {
    return true;
  }
  return false;
}

