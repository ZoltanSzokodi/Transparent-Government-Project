import axios from 'axios';
import APIkey from '../data/APIkey';
import senate from '../data/pro-congress-115-senate';

// const url = "https://api.propublica.org/congress/v1/115/senate/members.json";
// const config = {
//   "X-API-Key": APIkey
// }
// const data = axios.get(url, { headers: config }).then(response => {
//   console.log(response);
// });

const senateMembersArr = senate.results[0].members;
const senateTable = document.getElementById("senate-table");

console.log(senateMembersArr);


const appendSenateData = data => {
  data.forEach((senator, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML =
      `<td>${i + 1} ${senator.first_name} 
          ${senator.middle_name === null ? " " : senator.middle_name} 
          ${senator.last_name}
      </td>
      <td>${senator.party}</td>
      <td>${senator.state}</td>
      <td>${senator.seniority}</td>
      <td>${senator.votes_with_party_pct}</td>`;
    senateTable.appendChild(tr);
  });
}

appendSenateData(senateMembersArr);

