// VIEW - RENDER FUNCTIONS ---------------------------------------------------

// DROPDOWN FOR STATES
export function renderStateSelect() {
  const select = document.getElementById("table-state-select");
  let statesArr = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

  statesArr.forEach(state => {
    let option = document.createElement("option");
    option.innerHTML = state;
    option.value = state;
    select.appendChild(option)
  });
}

// RENDER ALL THE MEMBERS TABLE
export function renderMembersTable(stats, checkArr, state) {
  const t_body = document.querySelector(".members-table_tbody");
  const tableLength = document.querySelector(".table-length");
  let tableCount = 0;

  stats.forEach(mem => {
    if (checkArr.includes(mem.party) && state === "All") {
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
      t_body.appendChild(tr)
    } else if (checkArr.includes(mem.party) && state != "All") {
      if (mem.state === state) {
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
        t_body.appendChild(tr)
      }
    }
  })
  tableLength.textContent = tableCount;
}

// RENDER CHAMBER AT GLANCE TABLE
export function renderChamberAtGlance(stats) {
  const table = document.querySelector(".attendance-table_tbody");

  for (let key in stats) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${key}</td>
      <td>${key === "Total" ? stats[key].membersPerChamber.length : stats[key].membersPerParty}</td>
      <td>${key === "Total" ? stats[key].avrgVotesWithParty : stats[key].votesWithParty} %</td>`;
    table.appendChild(tr)
  }
}

// RENDER ENGAGEMENT OR LOYALTY TABLE
export function renderEngagementOrLoyaltyTable(stats, type, quality) {
  const table = quality === "least" ? document.querySelector('.least-table_tbody') : document.querySelector(".most-table_tbody");

  if (type === "loyalty") {
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
    })
  } else if (type === "engagement") {
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
      table.appendChild(tr)
    });
  }
}