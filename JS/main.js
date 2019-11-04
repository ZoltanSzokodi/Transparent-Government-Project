import statistics from './statistics.js';

const senateDataPage = document.location.pathname === "/senate-data.html";
const houseDataPage = document.location.pathname === "/house-data.html";
const senateAttendancePage = document.location.pathname === "/senate-attendance.html";
const houseAttendancePage = document.location.pathname === "/house-attendance.html";
const senateLoyaltyPage = document.location.pathname === '/senate-loyalty.html';
const houseLoyaltyPage = document.location.pathname === '/house-loyalty.html';

// CONTROLLER -------------------------------------

const toggleFunctions = () => {
  if (houseDataPage) {
    const { arrOfMembersPerChamber } = statistics.houseStats.Total;
    const checkboxes = document.querySelectorAll('.checkbox');
    const t_body = document.querySelector(".members-table_tbody");
    let checkBoxArr = ["R", "D", "I"];

    checkboxes.forEach(c => {
      c.addEventListener('click', e => {
        if (checkBoxArr.includes(e.target.value)) {
          checkBoxArr.splice(checkBoxArr.indexOf(e.target.value), 1);
          t_body.innerHTML = "";
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr);
        } else {
          checkBoxArr.push(e.target.value);
          t_body.innerHTML = "";
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr);
        }
      });
    })

    renderMembersTable(arrOfMembersPerChamber, checkBoxArr);

  } else if (senateDataPage) {
    const { arrOfMembersPerChamber } = statistics.senateStats.Total;
    const checkboxes = document.querySelectorAll('.checkbox');
    const t_body = document.querySelector(".members-table_tbody");
    let checkBoxArr = ["R", "D", "I"];

    checkboxes.forEach(c => {
      c.addEventListener('click', e => {
        if (checkBoxArr.includes(e.target.value)) {
          checkBoxArr.splice(checkBoxArr.indexOf(e.target.value), 1);
          t_body.innerHTML = "";
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr);
        } else {
          checkBoxArr.push(e.target.value);
          t_body.innerHTML = "";
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr);
        }
      });
    })

    renderMembersTable(arrOfMembersPerChamber, checkBoxArr);

  } else if (houseAttendancePage) {
    const { houseStats } = statistics;
    const {
      arrOfLeastEngagedMembers,
      arrOfMostEngagedMembers
    } = statistics.houseStats.Total;

    renderAttendanceTable(houseStats);
    renderEngagementTable(arrOfLeastEngagedMembers, "least");
    renderEngagementTable(arrOfMostEngagedMembers, "most");

  } else if (senateAttendancePage) {
    const { senateStats } = statistics;
    const {
      arrOfLeastEngagedMembers,
      arrOfMostEngagedMembers
    } = statistics.senateStats.Total;

    renderAttendanceTable(senateStats);
    renderEngagementTable(arrOfLeastEngagedMembers, "least");
    renderEngagementTable(arrOfMostEngagedMembers, "most");

  } else if (senateLoyaltyPage) {
    const { senateStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = statistics.senateStats.Total;

    renderAttendanceTable(senateStats);
    renderLoyaltyTable(leastLoyal, "least");
    renderLoyaltyTable(mostLoyal, "most");

    console.log(leastLoyal);

  } else if (houseLoyaltyPage) {
    const { houseStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = statistics.houseStats.Total;

    renderAttendanceTable(houseStats);
    renderLoyaltyTable(leastLoyal, "least");
    renderLoyaltyTable(mostLoyal, "most");

    console.log(leastLoyal);
  }
}

// VIEW---------------------------------------------------

const renderMembersTable = (stats, checkArr) => {
  const t_body = document.querySelector(".members-table_tbody");
  const tableLength = document.querySelector(".table-length");
  let tableCount = 0;

  stats.forEach((mem, i) => {
    if (checkArr.includes(mem.party)) {
      let tr = document.createElement("tr");
      tableCount++;

      tr.innerHTML =
        `<td> 
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
      t_body.appendChild(tr);
    }
  });
  tableLength.textContent = tableCount;

};

// Append appropriate data to attendance table
const renderAttendanceTable = stats => {
  const table = document.querySelector(".attendance-table_tbody");

  for (let key in stats) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${key}</td>
      <td>${key === "Total" ? stats[key].arrOfMembersPerChamber.length : stats[key].numOfMembersPerParty}</td>
      <td>${key === "Total" ? stats[key].avrgVotesWithParty : stats[key].votesWithParty} %</td>`;
    table.appendChild(tr);
  }
}

const renderEngagementTable = (stats, type) => {
  const table = type === "least" ? document.querySelector('.least-table_tbody') : document.querySelector(".most-table_tbody");

  stats.forEach((mem, i) => {
    let tr = document.createElement("tr");

    tr.innerHTML =
      `<td>${i + 1}. 
          <a href="${mem.url}" target="_blank">
            ${mem.first_name} 
            ${mem.middle_name === null ? " " : mem.middle_name} 
            ${mem.last_name}
          <a/>
        </td>
        <td>${mem.missed_votes}</td>
        <td>${mem.missed_votes_pct} %</td>`;
    table.appendChild(tr);
  });
}

const renderLoyaltyTable = (stats, type) => {
  const table = type === "least" ? document.querySelector('.least-table_tbody') : document.querySelector(".most-table_tbody");

  stats.forEach((mem, i) => {
    let tr = document.createElement("tr");

    tr.innerHTML =
      `<td>${i + 1}. 
          <a href="${mem.url}" target="_blank">
            ${mem.first_name} 
            ${mem.middle_name === null ? " " : mem.middle_name} 
            ${mem.last_name}
          <a/>
        </td>
        <td>${mem.votes_against_party_pct} %</td>
        <td>${mem.votes_with_party_pct} %</td>`;
    table.appendChild(tr);
  });
}

toggleFunctions();