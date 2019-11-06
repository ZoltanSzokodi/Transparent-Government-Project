// import house from "../data/pro-congress-115-house.js";
// import senate from "../data/pro-congress-115-senate.js";
import APIkey from "../data/APIkey.js";

// FETCH DATA ---------------------------------------------------
// async function getData(congressNo, chamber) {
//   let url = `https://api.propublica.org/congress/v1/${congressNo}/${chamber}/members.json`;
//   try {
//     let response = await fetch(url, {
//       headers: {
//         "X-API-Key": APIkey
//       }
//     })
//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// }

async function getData() {
  let url1 = "https://api.propublica.org/congress/v1/116/senate/members.json";
  let url2 = "https://api.propublica.org/congress/v1/116/house/members.json";

  let response = await Promise.all([
    fetch(url1, { headers: { "X-API-Key": APIkey } }).then(value => value.json()),
    fetch(url2, { headers: { "X-API-Key": APIkey } }).then(value => value.json())
  ]);

  return response;
}

// STATISTICS OBJECT ---------------------------------------------------
async function statistics() {
  // let senate = await getData(116, "senate").then(data => data);
  // let house = await getData(116, "house").then(data => data);
  let congress = await getData().then(data => data);

  // congress[0] = senate
  // congress[1] = house
  return {
    senateStats: {
      "Republicans": {
        "membersPerParty": getNumMemPerP(congress[0], "R"),
        "votesWithParty": getVotesWP(congress[0], "R")
      },
      "Democrats": {
        "membersPerParty": getNumMemPerP(congress[0], "D"),
        "votesWithParty": getVotesWP(congress[0], "D")
      },
      "Independent": {
        "membersPerParty": getNumMemPerP(congress[0], "I"),
        "votesWithParty": getVotesWP(congress[0], "I")
      },
      "Total": {
        "membersPerChamber": getArrMemPerC(congress[0]),
        "avrgVotesWithParty": getVotesWP(congress[0], false),
        // "leastEngaged": getArrMemEng(congress[0], false),
        // "mostEngaged": getArrMemEng(congress[0], true),
        // "leastLoyal": getArrMemLoy(congress[0], "least"),
        // "mostLoyal": getArrMemLoy(congress[0], "most")
        "leastEngaged": getArrMemEngOrLoy(congress[0], "engagement", "least"),
        "mostEngaged": getArrMemEngOrLoy(congress[0], "engagement", "most"),
        "leastLoyal": getArrMemEngOrLoy(congress[0], "loyalty", "least"),
        "mostLoyal": getArrMemEngOrLoy(congress[0], "loyalty", "most")
      }
    },
    houseStats: {
      "Republicans": {
        "membersPerParty": getNumMemPerP(congress[1], "R"),
        "votesWithParty": getVotesWP(congress[1], "R")
      },
      "Democrats": {
        "membersPerParty": getNumMemPerP(congress[1], "D"),
        "votesWithParty": getVotesWP(congress[1], "D")
      },
      "Independent": {
        "membersPerParty": getNumMemPerP(congress[1], "I"),
        "votesWithParty": getVotesWP(congress[1], "I")
      },
      "Total": {
        "membersPerChamber": getArrMemPerC(congress[1]),
        "avrgVotesWithParty": getVotesWP(congress[1], false),
        // "leastEngaged": getArrMemEng(congress[1], false),
        // "mostEngaged": getArrMemEng(congress[1], true),
        // "leastLoyal": getArrMemLoy(congress[1], "least"),
        // "mostLoyal": getArrMemLoy(congress[1], "most")
        "leastEngaged": getArrMemEngOrLoy(congress[1], "engagement", "least"),
        "mostEngaged": getArrMemEngOrLoy(congress[1], "engagement", "most"),
        "leastLoyal": getArrMemEngOrLoy(congress[1], "loyalty", "least"),
        "mostLoyal": getArrMemEngOrLoy(congress[1], "loyalty", "most")
      }
    }
  };
}

// STATISTICS CALCULATIONS ---------------------------------------------------

// membersPerChamber
function getArrMemPerC(chamber) {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => membersArr.push(mem))
  return membersArr;
}

// membersPerParty
function getNumMemPerP(chamber, party) {
  let membersArr = [];
  chamber.results[0].members.forEach(mem => {
    if (mem.party === party) {
      membersArr.push(`${mem.first_name} ${mem.last_name}`)
    }
  })
  return membersArr.length;
}

// avrgVotesWithParty - votesWithParty
function getVotesWP(chamber, party) {
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
}

// leastEngaged - mostEngaged
// function getArrMemEng(chamber, boolean) {
//   let membersArr = [];
//   chamber.results[0].members.forEach(mem => {
//     if (mem.missed_votes_pct != undefined) {
//       membersArr.push(mem)
//     }
//   })

//   let sortByEngagement;
//   if (boolean) {
//     sortByEngagement = membersArr.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
//   } else {
//     sortByEngagement = membersArr.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
//   }

//   return sortByEngagement.slice(0, sortByEngagement.length * 0.1);
// }

// // leastLoyal - mostLoyal
// function getArrMemLoy(chamber, typeOfLoyalty) {
//   let membersArr = [];
//   chamber.results[0].members.forEach(mem => {
//     if (mem.votes_with_party_pct != undefined) {
//       membersArr.push(mem);
//     }
//   })
//   let sortByLoyalty;
//   if (typeOfLoyalty === "least") {
//     sortByLoyalty = membersArr.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
//   } else {
//     sortByLoyalty = membersArr.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
//   }
//   return sortByLoyalty.slice(0, sortByLoyalty.length * 0.1);
// }

// leastEngaged/leastLoyal - mostEngaged/mostLoyal
function getArrMemEngOrLoy(chamber, type, quality) {
  let membersArr = [];
  let sortByQuality;
  if (type === "loyalty") {
    chamber.results[0].members.forEach(mem => {
      if (mem.votes_with_party_pct != undefined) {
        membersArr.push(mem);
      }
    })
    if (quality === "least") {
      sortByQuality = membersArr.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
    } else {
      sortByQuality = membersArr.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
    }

    return sortByQuality.slice(0, sortByQuality.length * 0.1);

  } else if (type === "engagement") {
    chamber.results[0].members.forEach(mem => {
      if (mem.missed_votes_pct != undefined) {
        membersArr.push(mem)
      }
    })
    if (quality === "least") {
      sortByQuality = membersArr.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct)
    } else {
      sortByQuality = membersArr.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct)
    }

    return sortByQuality.slice(0, sortByQuality.length * 0.1)
  }
}

export default statistics;
