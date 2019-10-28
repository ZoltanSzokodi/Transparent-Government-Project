import axios from 'axios';
import APIkey from '../data/APIkey';
import senate from '../data/pro-congress-115-senate';



// const url = "https://api.propublica.org/congress/v1/115/senate/members.json";
// const config = {
//   "X-API-Key": APIkey
// }
// const data = async axios.get(url, { headers: config }).then(response => {
//   console.log(response);
// });

// TESTING
console.log(senate["results"][0]["members"][10]["id"]);
