import statistics from "./Model.js";
import {
  renderStateSelect,
  renderMembersTable,
  renderChamberAtGlance,
  renderEngagementOrLoyaltyTable
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
  try {
    let data = await statistics().then(data => data);

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
      const {
        leastEngaged,
        mostEngaged
      } = data.houseStats.Total;

      renderChamberAtGlance(data.houseStats);
      renderEngagementOrLoyaltyTable(leastEngaged, "engagement", "least")
      renderEngagementOrLoyaltyTable(mostEngaged, "engagement", "most")

    } else if (senateAttendancePage) {
      const {
        leastEngaged,
        mostEngaged
      } = data.senateStats.Total;

      renderChamberAtGlance(data.senateStats);
      renderEngagementOrLoyaltyTable(leastEngaged, "engagement", "least")
      renderEngagementOrLoyaltyTable(mostEngaged, "engagement", "most")

    } else if (senateLoyaltyPage) {
      const {
        leastLoyal,
        mostLoyal
      } = data.senateStats.Total;

      renderChamberAtGlance(data.senateStats);
      renderEngagementOrLoyaltyTable(leastLoyal, "loyalty", "least")
      renderEngagementOrLoyaltyTable(mostLoyal, "loyalty", "most")

    } else if (houseLoyaltyPage) {
      const {
        leastLoyal,
        mostLoyal
      } = data.houseStats.Total;

      renderChamberAtGlance(data.houseStats);
      renderEngagementOrLoyaltyTable(leastLoyal, "loyalty", "least")
      renderEngagementOrLoyaltyTable(mostLoyal, "loyalty", "most")
    }
  } catch (err) {
    console.log(err);
  }
}

export default controllerRouter;
