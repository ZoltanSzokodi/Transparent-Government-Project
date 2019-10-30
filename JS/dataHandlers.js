import house from '../data/pro-congress-115-house';
import senate from '../data/pro-congress-115-senate';

// Determin which data to use depending on location
export const toggleData = () => {
  const chambers = {
    house: {
      members: house.results[0].members,
      table: document.querySelector(".house-table_tbody"),
      url: house.results[0].url
    },
    senate: {
      members: senate.results[0].members,
      table: document.querySelector(".senate-table_tbody"),
      url: senate.results[0].url
    }
  }

  if (document.location.pathname === "/house-data.html") {
    return chambers.house;
  } else if (document.location.pathname === "/senate-data.html") {
    return chambers.senate;
  }
}

// Calculate statistics
export const numberOfMembersPerParty = () => {
  const statistics = {
    houseStats: {
      "Republicans": [],
      "Democrats": [],
      "Independent": []
    },
    senateStats: {
      "Republicans": [],
      "Democrats": [],
      "Independent": []
    }
  };

  // Loop through data according to data passsed in
  const loopData = (chamber, statsObj) => {
    chamber.results[0].members.forEach(mem => {
      if (mem.party === "R") {
        statsObj.Republicans.push(`${mem.first_name} ${mem.last_name}`);
      } else if (mem.party === "D") {
        statsObj.Democrats.push(`${mem.first_name} ${mem.last_name}`);
      } else {
        statsObj.Independent.push(`${mem.first_name} ${mem.last_name}`);
      }
    })

    return statsObj;
  };

  if (document.location.pathname === "/house-attendance.html") {
    return loopData(house, statistics.houseStats);
  } else if (document.location.pathname === "/senate-attendance.html") {
    return loopData(senate, statistics.senateStats);
  }
}
