import house from '../data/pro-congress-115-house';
import senate from '../data/pro-congress-115-senate';

// Determin which data to use depending on location
const toggleData = () => {
  const houseObj = {
    members: house.results[0].members,
    table: document.querySelector(".house-table_tbody")
  }
  const senateObj = {
    members: senate.results[0].members,
    table: document.querySelector(".senate-table_tbody")
  }

  if (document.location.pathname === "/house-data.html") {
    return houseObj;
  } else if (document.location.pathname === "/senate-data.html") {
    return senateObj;
  }
}

// Append appropriate data to table
const appendData = fn => {
  const { members, table } = fn;

  members.forEach((mem, i) => {
    let tr = document.createElement("tr");

    tr.innerHTML =
      `<td>${i + 1}. 
          ${mem.first_name} 
          ${mem.middle_name === null ? " " : mem.middle_name} 
          ${mem.last_name}
        </td>
        <td>${mem.party}</td>
        <td>${mem.state}</td>
        <td>${mem.seniority}</td>
        <td>
          ${mem.votes_with_party_pct === undefined ? "no data" : mem.votes_with_party_pct}
        </td>`;
    table.appendChild(tr);
  });
}

toggleData();
appendData(toggleData());
