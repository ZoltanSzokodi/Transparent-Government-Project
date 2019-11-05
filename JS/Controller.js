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

function controllerRouter() {
  if (houseDataPage || senateDataPage) {
    const { arrOfMembersPerChamber } = houseDataPage ? statistics.houseStats.Total : statistics.senateStats.Total;
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
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr, ...selectedState)
        } else {
          checkBoxArr.push(e.target.value)
          t_body.innerHTML = "";
          renderMembersTable(arrOfMembersPerChamber, checkBoxArr, ...selectedState)
        }
      })
    })

    select.addEventListener("click", e => {
      selectedState.splice(0, 1, e.target.value)
      t_body.innerHTML = "";
      renderMembersTable(arrOfMembersPerChamber, checkBoxArr, ...selectedState)
    })

    renderStateSelect()
    renderMembersTable(arrOfMembersPerChamber, checkBoxArr, ...selectedState)

  } else if (houseAttendancePage) {
    const { houseStats } = statistics;
    const {
      arrOfLeastEngagedMembers,
      arrOfMostEngagedMembers
    } = statistics.houseStats.Total;

    renderChamberAtGlance(houseStats);
    renderEngagementTable(arrOfLeastEngagedMembers, "least")
    renderEngagementTable(arrOfMostEngagedMembers, "most")

  } else if (senateAttendancePage) {
    const { senateStats } = statistics;
    const {
      arrOfLeastEngagedMembers,
      arrOfMostEngagedMembers
    } = statistics.senateStats.Total;

    renderChamberAtGlance(senateStats);
    renderEngagementTable(arrOfLeastEngagedMembers, "least")
    renderEngagementTable(arrOfMostEngagedMembers, "most")

  } else if (senateLoyaltyPage) {
    const { senateStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = statistics.senateStats.Total;

    renderChamberAtGlance(senateStats);
    renderLoyaltyTable(leastLoyal, "least")
    renderLoyaltyTable(mostLoyal, "most")

  } else if (houseLoyaltyPage) {
    const { houseStats } = statistics;
    const {
      leastLoyal,
      mostLoyal
    } = statistics.houseStats.Total;

    renderChamberAtGlance(houseStats);
    renderLoyaltyTable(leastLoyal, "least")
    renderLoyaltyTable(mostLoyal, "most")
  }
}

export default controllerRouter;
