function calculateDelivery() {
  const startLocation = document.getElementById("startLocation").value;
  const endLocation = document.getElementById("endLocation").value;
  const route = findShortestDistance(startLocation, endLocation);
  const resultDiv = document.getElementById("result");

  if (route) {
    const totalDaysArr = calculateTotalDays(route);
    const currentDate = new Date();
    const totalDays = totalDaysArr.reduce((acc, curr) => {
      return acc + curr;
    });
    const deliveryDate = calculateDestinationDate(currentDate, totalDays);

    resultDiv.innerHTML = `Route: ${route.join(" -> ")}
     <br>${totalDaysArr.join(
       "+"
     )} = ${totalDays} days. ${final} Start -> Arrive on ${deliveryDate.getDate()}${nth(
      date
    )} ${deliveryDate.toLocaleString("default", { month: "short" })}.`;
    resultDiv.style.textAlign = "center";
  } else {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Route not found";
    resultDiv.style.backgroundColor = "red";
    resultDiv.style.textAlign = "center";
  }
}

function findShortestDistance(start, end) {
  const routeFind = {
    Tirunelveli: { Madurai: 2 },
    Madurai: { Tirunelveli: 2, Trichy: 2, Salem: 3, Coimbatore: 3 },
    Trichy: { Chennai: 3 },
    Coimbatore: { Chennai: 3, Bangalore: 3 },
    Salem: { Bangalore: 2 },
    Chennai: { Bangalore: 2, Mumbai: 5 },
    Bangalore: { Mumbai: 3 },
  };
  const visited = new Set();
  const queue = [[start, []]];
  while (queue.length) {
    const [node, path] = queue.shift();
    visited.add(node);
    for (const [neighbor, days] of Object.entries(routeFind[node] || {})) {
      if (neighbor === end) {
        return [...path, node, end];
      }
      if (!visited.has(neighbor)) {
        queue.push([neighbor, [...path, node]]);
        console.log(node);
      }
    }
  }
  return null;
}

function calculateTotalDays(route) {
  const routeFind = {
    Tirunelveli: { Madurai: 2 },
    Madurai: { Tirunelveli: 2, Trichy: 2, Salem: 3, Coimbatore: 3 },
    Trichy: { Chennai: 3 },
    Coimbatore: { Chennai: 3, Bangalore: 3 },
    Salem: { Bangalore: 2 },
    Chennai: { Bangalore: 2, Mumbai: 5 },
    Bangalore: { Mumbai: 3 },
  };
  let totalDays = 0;
  let str = [];
  for (let i = 0; i < route.length - 1; i++) {
    const result = routeFind[route[i]][route[i + 1]];
    totalDays += result;
    str.push(result);
  }
  return str;
}

function calculateDestinationDate(startDate, totalDays) {
  // 0-Sunday, 6 -Saturday
  const weekends = [0, 6];
  let currentDate = new Date(startDate);
  let daysToAdd = 0;
  while (daysToAdd < totalDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    // Skip weekends
    if (!weekends.includes(currentDate.getDay())) {
      daysToAdd++;
    }
  }
  return currentDate;
}
//date

const today = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = months[today.getMonth()];
//set date
const nth = (num) => {
  if (num > 3 && num < 21) return "th";
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const date = today.getDate();
const final = `${date}${nth(date)} ${month.slice(0, 3)}`;
document.getElementById("startDate").value = final;
