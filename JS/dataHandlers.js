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
