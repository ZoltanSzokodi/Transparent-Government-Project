import statistics from "./Model.js";
import {
  renderStateSelect,
  renderMembersTable,
  renderChamberAtGlance,
  renderEngagementTable,
  renderLoyaltyTable
} from "./View.js";

// CONTROLLER - ROUTES ---------------------------------------------

const senateDataPage = document.location.pathname === "/senate-data.html";
const houseDataPage = document.location.pathname === "/house-data.html";
const senateAttendancePage = document.location.pathname === "/senate-attendance.html";
const houseAttendancePage = document.location.pathname === "/house-attendance.html";
const senateLoyaltyPage = document.location.pathname === "/senate-loyalty.html";
const houseLoyaltyPage = document.location.pathname === "/house-loyalty.html";

// CONTROLLER - ROUTER ---------------------------------------------

async function controllerRouter() {
  let data = await statistics().then(data => data);
  // let senateStats = await statistics().then(data => data.senateStats);
  // let houseStats = await statistics().then(data => data.houseStats);

  if (houseDataPage || senateDataPage) {
    const { membersPerChamber } = houseDataPage ? data.houseStats.Total : data.senateStats.Total;
    const checkboxes = document.querySelectorAll(".checkbox");
    const select = document.getElementById("table-state-select");
    const t_body = document.querySelector(".members-table_tbody");
    let checkBoxArr = ["R", "D", "I"];
    let selectedState = ["All"];

    checkboxes.forEach(c => {
      c.addEventListener("click", e => {
        if (checkBoxArr.includes(e.target.value)) {
          checkBoxArr.splice(checkBoxArr.indexOf(e.target.value), 1)
          t_body.innerHTML = "";
          renderMembersTable(membersPerChamber, checkBoxArr, ...selectedState)
        } else {
          checkBoxArr.push(e.target.value)
          t_body.innerHTML = "";
          renderMembersTable(membersPerChamber, checkBoxArr, ...selectedState)
        }
      })
    })

    select.addEventListener("click", e => {
      selectedState.splice(0, 1, e.target.value)
      t_body.innerHTML = "";
      renderMembersTable(membersPerChamber, checkBoxArr, ...selectedState)
    })

    renderStateSelect()
    renderMembersTable(membersPerChamber, checkBoxArr, ...selectedState)

  } else if (houseAttendancePage) {
    // const { houseStats } = statistics;
    const {
      leastEngaged,
      mostEngaged
    } = data.houseStats.Total;

    renderChamberAtGlance(data.houseStats);
    renderEngagementTable(leastEngaged, "least")
    renderEngagementTable(mostEngaged, "most")

  } else if (senateAttendancePage) {
    // const { senateStats } = statistics;
    const {
      leastEngaged,
      mostEngaged
    } = data.senateStats.Total;

    renderChamberAtGlance(data.senateStats);
    renderEngagementTable(leastEngaged, "least")
    renderEngagementTable(mostEngaged, "most")

  } else if (senateLoyaltyPage) {
    // const { senateStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = data.senateStats.Total;

    renderChamberAtGlance(data.senateStats);
    renderLoyaltyTable(leastLoyal, "least")
    renderLoyaltyTable(mostLoyal, "most")

  } else if (houseLoyaltyPage) {
    // const { houseStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = data.houseStats.Total;

    renderChamberAtGlance(data.houseStats);
    renderLoyaltyTable(leastLoyal, "least")
    renderLoyaltyTable(mostLoyal, "most")
  }
}

export default controllerRouter;
