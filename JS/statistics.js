import house from '../data/pro-congress-115-house';
import senate from '../data/pro-congress-115-senate';

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

const getSumOfMembersPerChamber = chamber => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => membersArr.push(mem));
  return membersArr;
}

const getAvrgOfVotesWithParty = chamber => {
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
      "sumOfMembersPerChamber": getSumOfMembersPerChamber(house),
      "avrgOfVotesWithParty": getAvrgOfVotesWithParty(house)
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
      "sumOfMembersPerChamber": getSumOfMembersPerChamber(senate),
      "avrgOfVotesWithParty": getAvrgOfVotesWithParty(senate)
    }
  }
};

export default statistics;