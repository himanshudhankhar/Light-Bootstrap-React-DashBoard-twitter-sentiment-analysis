
import axios from "axios";
require('dotenv').config();
function getBase(){
let base = "";
if(process.env.Node && process.env.Node=='production'){
    base=''
}else{
    base=process.env.REACT_APP_BACKENED_URL
}
return base}
export default axios.create({
  baseURL: getBase(),
  responseType: "json"
});