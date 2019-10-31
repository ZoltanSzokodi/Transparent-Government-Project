import { toggleData } from './dataHandlers';
import statistics from './statistics';

const senateDataPage = document.location.pathname === "/senate-data.html";
const houseDataPage = document.location.pathname === "/house-data.html";
const senateAttendancePage = document.location.pathname === "/senate-attendance.html";
const houseAttendancePage = document.location.pathname === "/house-attendance.html";

// Decide which render function to use according to file path
const toggleFunctions = () => {
  if (houseDataPage || senateDataPage) {
    renderMembersTable(toggleData());
  } else if (houseAttendancePage) {
    renderAttendanceTable(statistics.houseStats);
    console.log(statistics);
  } else if (senateAttendancePage) {
    renderAttendanceTable(statistics.senateStats);
  }
}

// Append appropriate data to members table
const renderMembersTable = fn => {
  const { members } = fn;
  const table = document.querySelector(".members-table_tbody");

  members.forEach((mem, i) => {
    let tr = document.createElement("tr");

    tr.innerHTML =
      `<td>${i + 1}. 
          <a href="${mem.url}" target="_blank">
            ${mem.first_name} 
            ${mem.middle_name === null ? " " : mem.middle_name} 
            ${mem.last_name}
          <a/>
        </td>
        <td>${mem.party}</td>
        <td>${mem.state}</td>
        <td>${mem.seniority}</td>
        <td>
          ${mem.votes_with_party_pct === undefined ? "no data" : mem.votes_with_party_pct} %
        </td>`;
    table.appendChild(tr);
  });
};

// Append appropriate data to attendance table
const renderAttendanceTable = stats => {
  const table = document.querySelector(".attendance-table_tbody");

  for (let key in stats) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${key}</td>
      <td>${key === "Total" ? stats[key].sumOfMembersPerChamber : stats[key].numOfMembersPerParty}</td>
      <td>${key === "Total" ? stats[key].avrgOfVotesWithParty : stats[key].votesWithParty} %</td>`;
    table.appendChild(tr);
  }
}

toggleFunctions();