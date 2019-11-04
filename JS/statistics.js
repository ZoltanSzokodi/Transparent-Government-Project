import house from '../data/pro-congress-115-house.js';
import senate from '../data/pro-congress-115-senate.js';

// STATISTICS ------------------------------------------------------------
const getNumMemPerP = (chamber, party) => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.party === party) {
      membersArr.push(`${mem.first_name} ${mem.last_name}`)
    }
  })
  return membersArr.length;
};

// const getVotesWP = (chamber, party) => {
//   let count = 0;
//   let votesSum = 0;
//   chamber.results[0].members.forEach(mem => {
//     if (mem.party === party) {
//       if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
//         votesSum += mem.votes_with_party_pct * 1
//         count++;
//       }
//     }
//   })
//   let votesAvrg = votesSum === 0 ? 0 : votesSum / count;
//   return votesAvrg.toFixed(2) * 1;
// };

// const getAvgVotesWP = chamber => {
//   let count = 0;
//   let votesSum = 0;
//   chamber.results[0].members.forEach(mem => {
//     if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
//       votesSum += mem.votes_with_party_pct * 1
//       count++;
//     }
//   })
//   let votesAvrg = votesSum / count;
//   return votesAvrg.toFixed(2) * 1;
// }

const getVotesWP = (chamber, party) => {
  let count = 0;
  let votesSum = 0;
  chamber.results[0].members.forEach(mem => {
    if (party) {
      if (mem.party === party) {
        if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
          votesSum += mem.votes_with_party_pct * 1
          count++;
        }
      }
    } else if (!party) {
      if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
        votesSum += mem.votes_with_party_pct * 1
        count++;
      }
    }
  })
  let votesAvrg = votesSum === 0 ? 0 : votesSum / count;
  return votesAvrg.toFixed(2) * 1;
};


const getArrMemPerC = chamber => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => membersArr.push(mem));
  return membersArr;
};

const getArrMemEng = (chamber, boolean) => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.missed_votes_pct != undefined) {
      membersArr.push(mem);
    }
  });
  let sortByEngagement;
  if (boolean) {
    sortByEngagement = membersArr.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
  } else {
    sortByEngagement = membersArr.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
  }
  return sortByEngagement.slice(0, sortByEngagement.length * 0.1);
};



const getArrMemLoy = (chamber, typeOfLoyalty) => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.votes_with_party_pct != undefined) {
      membersArr.push(mem);
    }
  });
  let sortByLoyalty;
  if (typeOfLoyalty === "least") {
    sortByLoyalty = membersArr.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
  } else {
    sortByLoyalty = membersArr.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
  }
  return sortByLoyalty.slice(0, sortByLoyalty.length * 0.1);
};



const statistics = {
  houseStats: {
    "Republicans": {
      "numOfMembersPerParty": getNumMemPerP(house, "R"),
      "votesWithParty": getVotesWP(house, "R")
    },
    "Democrats": {
      "numOfMembersPerParty": getNumMemPerP(house, "D"),
      "votesWithParty": getVotesWP(house, "D")
    },
    "Independent": {
      "numOfMembersPerParty": getNumMemPerP(house, "I"),
      "votesWithParty": getVotesWP(house, "I")
    },
    "Total": {
      "arrOfMembersPerChamber": getArrMemPerC(house),
      "avrgVotesWithParty": getVotesWP(house, false),
      "arrOfLeastEngagedMembers": getArrMemEng(house, false),
      "arrOfMostEngagedMembers": getArrMemEng(house, true),
      "leastLoyal": getArrMemLoy(house, "least"),
      "mostLoyal": getArrMemLoy(house, "most")
    }
  },
  senateStats: {
    "Republicans": {
      "numOfMembersPerParty": getNumMemPerP(senate, "R"),
      "votesWithParty": getVotesWP(senate, "R")
    },
    "Democrats": {
      "numOfMembersPerParty": getNumMemPerP(senate, "D"),
      "votesWithParty": getVotesWP(senate, "D")
    },
    "Independent": {
      "numOfMembersPerParty": getNumMemPerP(senate, "I"),
      "votesWithParty": getVotesWP(senate, "I")
    },
    "Total": {
      "arrOfMembersPerChamber": getArrMemPerC(senate),
      "avrgVotesWithParty": getVotesWP(senate, false),
      "arrOfLeastEngagedMembers": getArrMemEng(senate, false),
      "arrOfMostEngagedMembers": getArrMemEng(senate, true),
      "leastLoyal": getArrMemLoy(senate, "least"),
      "mostLoyal": getArrMemLoy(senate, "most")
    }
  }
};

export default statistics;
