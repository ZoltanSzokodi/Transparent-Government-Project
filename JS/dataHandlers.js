import house from '../data/pro-congress-115-house';
import senate from '../data/pro-congress-115-senate';

// Determin which data to use depending on location
export const toggleData = () => {
  const chambers = {
    house: {
      members: house.results[0].members,
      url: house.results[0].url
    },
    senate: {
      members: senate.results[0].members,
      url: senate.results[0].url
    }
  }

  if (document.location.pathname === "/house-data.html") {
    return chambers.house;
  } else if (document.location.pathname === "/senate-data.html") {
    return chambers.senate;
  }
};

// STATISTICS ------------------------------------------------------------
const getNumberOfReps = (chamber, party) => {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.party === party) {
      membersArr.push(`${mem.first_name} ${mem.last_name}`)
    }
  })
  return membersArr.length;
};


const getAvrgVotesWithParty = (chamber, party) => {
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

export const statistics = {
  houseStats: {
    "Republicans": {
      "numOfMembers": getNumberOfReps(house, "R"),
      "votesWithParty": getAvrgVotesWithParty(house, "R")
    },
    "Democrats": {
      "numOfMembers": getNumberOfReps(house, "D"),
      "votesWithParty": getAvrgVotesWithParty(house, "D")
    },
    "Independent": {
      "numOfMembers": getNumberOfReps(house, "I"),
      "votesWithParty": getAvrgVotesWithParty(house, "I")
    },
    "Total": {
      "sumOfMembers": 0,
      "avrgOfVotesWithParty": 0
    }
  },
  senateStats: {
    "Republicans": {
      "numOfMembers": getNumberOfReps(senate, "R"),
      "votesWithParty": getAvrgVotesWithParty(senate, "R")
    },
    "Democrats": {
      "numOfMembers": getNumberOfReps(senate, "D"),
      "votesWithParty": getAvrgVotesWithParty(senate, "D")
    },
    "Independent": {
      "numOfMembers": getNumberOfReps(senate, "I"),
      "votesWithParty": getAvrgVotesWithParty(senate, "I")
    },
    "Total": {
      "sumOfMembers": 0,
      "avrgOfVotesWithParty": 0
    }
  }
};
