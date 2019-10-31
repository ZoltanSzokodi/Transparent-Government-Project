import house from '../data/pro-congress-115-house.js';
import senate from '../data/pro-congress-115-senate.js';

// STATISTICS ------------------------------------------------------------
const getNumberOfMembersPerParty = (chamber, party) => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.party === party) {
      membersArr.push(`${mem.first_name} ${mem.last_name}`)
    }
  })
  return membersArr.length;
};

const getVotesWithParty = (chamber, party) => {
  let count = 0;
  let votesSum = 0;
  chamber.results[0].members.forEach(mem => {
    if (mem.party === party) {
      if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
        votesSum += mem.votes_with_party_pct * 1
        count++;
      }
    }
  })
  let votesAvrg = votesSum === 0 ? 0 : votesSum / count;
  return votesAvrg.toFixed(2) * 1;
};

const getAvrgVotesWithParty = chamber => {
  let count = 0;
  let votesSum = 0;
  chamber.results[0].members.forEach(mem => {
    if (mem.votes_with_party_pct != NaN && mem.votes_with_party_pct != undefined) {
      votesSum += mem.votes_with_party_pct * 1
      count++;
    }
  })
  let votesAvrg = votesSum / count;
  return votesAvrg.toFixed(2) * 1;
}

const getArrOfMembersPerChamber = chamber => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => membersArr.push(mem));
  return membersArr;
}

const getArrOfMemberEnagagement = (chamber, boolean) => {
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
}

const statistics = {
  houseStats: {
    "Republicans": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(house, "R"),
      "votesWithParty": getVotesWithParty(house, "R")
    },
    "Democrats": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(house, "D"),
      "votesWithParty": getVotesWithParty(house, "D")
    },
    "Independent": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(house, "I"),
      "votesWithParty": getVotesWithParty(house, "I")
    },
    "Total": {
      "arrOfMembersPerChamber": getArrOfMembersPerChamber(house),
      "avrgOfVotesWithParty": getAvrgVotesWithParty(house),
      "arrOfLeastEngagedMembers": getArrOfMemberEnagagement(house, false),
      "arrOfMostEngagedMembers": getArrOfMemberEnagagement(house, true)
    }
  },
  senateStats: {
    "Republicans": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(senate, "R"),
      "votesWithParty": getVotesWithParty(senate, "R")
    },
    "Democrats": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(senate, "D"),
      "votesWithParty": getVotesWithParty(senate, "D")
    },
    "Independent": {
      "numOfMembersPerParty": getNumberOfMembersPerParty(senate, "I"),
      "votesWithParty": getVotesWithParty(senate, "I")
    },
    "Total": {
      "arrOfMembersPerChamber": getArrOfMembersPerChamber(senate),
      "avrgOfVotesWithParty": getAvrgVotesWithParty(senate),
      "arrOfLeastEngagedMembers": getArrOfMemberEnagagement(senate, false),
      "arrOfMostEngagedMembers": getArrOfMemberEnagagement(senate, true),
    }
  }
};

export default statistics;
