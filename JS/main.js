import { toggleData } from './dataHandlers';
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

appendData(toggleData());