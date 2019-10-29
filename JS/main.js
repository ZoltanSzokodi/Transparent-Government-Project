import house from '../data/pro-congress-115-house';
import senate from '../data/pro-congress-115-senate';

const houseMembersArr = house.results[0].members;
const senateMembersArr = senate.results[0].members;

const appendHouseData = data => {
  const houseTable = document.getElementById("house-table");
  data.forEach((rep, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML =
      `<td>${i + 1} ${rep.first_name} 
          ${rep.middle_name === null ? " " : rep.middle_name} 
          ${rep.last_name}
      </td>
      <td>${rep.party}</td>
      <td>${rep.state}</td>
      <td>${rep.seniority}</td>
      <td>${rep.votes_with_party_pct}</td>`;
    houseTable.appendChild(tr);
  });
}

const appendSenateData = data => {
  const senateTable = document.getElementById("senate-table");
  data.forEach((sen, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML =
      `<td>${i + 1} ${sen.first_name} 
          ${sen.middle_name === null ? " " : sen.middle_name} 
          ${sen.last_name}
      </td>
      <td>${sen.party}</td>
      <td>${sen.state}</td>
      <td>${sen.seniority}</td>
      <td>${sen.votes_with_party_pct}</td>`;
    senateTable.appendChild(tr);
  });
}

const location = () => {
  if(document.location.pathname === "/house-data.html") {
    return appendHouseData(houseMembersArr);
  } else if (document.location.pathname === "/senate-data.html") {
    return appendSenateData(senateMembersArr);
  }
}

location();
