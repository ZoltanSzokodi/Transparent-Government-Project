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

// Calculate statistics
export const numberOfMembersPerParty = () => {
  const statistics = {
    houseStats: {
      "Republicans": [],
      "Democrats": [],
      "Independent": [],
      "Total": 0
    },
    senateStats: {
      "Republicans": [],
      "Democrats": [],
      "Independent": [],
      "Total": 0
    }
  };

  // Loop through data according to data passsed in
  const loopData = (chamber, statsObj) => {
    chamber.results[0].members.forEach(mem => {
      statsObj.Total++;
      if (mem.party === "R") {
        statsObj.Republicans.push(`${mem}`);
      } else if (mem.party === "D") {
        statsObj.Democrats.push(`${mem}`);
      } else {
        statsObj.Independent.push(`${mem}`);
      }
    })

    return statsObj;
  };

  // const calcAverageVotes = (chamber) => {
  //   const averages = {
  //     "RepAvg": 0,
  //     "DemAvg": 0,
  //     "IndAvg": 0
  //   }
  //   chamber.forEach(mem => {
  //     if (mem.party === "R") {
  //       averages.RepAvg += mem.votes_with_party_pct;
  //     } else if (mem.party === "D") {
  //       averages.DemAvg += mem.votes_with_party_pct;
  //     } else if (mem.party === "I") {
  //       averages.IndAvg += mem.votes_with_party_pct;
  //     }
  //   })
  // }

  if (document.location.pathname === "/house-attendance.html") {
    return loopData(house, statistics.houseStats);
  } else if (document.location.pathname === "/senate-attendance.html") {
    return loopData(senate, statistics.senateStats);
  }
};
