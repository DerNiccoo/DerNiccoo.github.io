const DAX = [
  "Adidas",
  "Allianz",
  "BASF",
  "Bayer",
  "Beiersdorf",
  "BMW",
  "Continental",
  "Covestro",
  "Daimler",
  "Delivery Hero",
  "Deutsche Bank",
  "Deutsche Börse",
  "Deutsche Post",
  "Deutsche Telekom",
  "Deutsche Wohnen",
  "E.ON",
  "Fresenius",
  "Fresenius Medical Care",
  "HeidelbergCement",
  "Henkel",
  "Infineon",
  "Linde",
  "Merck",
  "MTU Aero Engines",
  "Münchener Rück",
  "RWE",
  "SAP",
  "Siemens",
  "Volkswagen",
  "Vonovia",
];

function companyColor(company) {
  if (company === "Adidas") {
    return "#FAFAFA";
  } else if (company === "Allianz") {
    return "#003781";
  } else if (company === "BASF") {
    return "#010101";
  } else if (company === "Bayer") {
    return "#85CC28";
  } else if (company === "Beiersdorf") {
    return "#00126C";
  } else if (company === "BMW") {
    return "#48A5D1";
  } else if (company === "Continental") {
    return "#FFA500";
  } else if (company === "Covestro") {
    return "#84519A";
  } else if (company === "Daimler") {
    return "#F9F9F9";
  } else if (company === "Delivery Hero") {
    return "#D22028";
  } else if (company === "Deutsche Bank") {
    return "#000FA8";
  } else if (company === "Deutsche Börse") {
    return "#00008D";
  } else if (company === "Deutsche Post") {
    return "#FFCC00";
  } else if (company === "Deutsche Telekom") {
    return "#E2007A";
  } else if (company === "Deutsche Wohnen") {
    return "#1005A1";
  } else if (company === "E.ON") {
    return "#F21C0A";
  } else if (company === "Fresenius") {
    return "#1B1655";
  } else if (company === "Fresenius Medical Care") {
    return "#001D92";
  } else if (company === "HeidelbergCement") {
    return "#019C41";
  } else if (company === "Henkel") {
    return "#EC1B23";
  } else if (company === "Infineon") {
    return "#0066B3";
  } else if (company === "Linde") {
    return "#05BAE9";
  } else if (company === "Merck") {
    return "#0E69B0";
  } else if (company === "MTU Aero Engines") {
    return "#93B0C5";
  } else if (company === "Münchener Rück") {
    return "#004C86";
  } else if (company === "RWE") {
    return "#1A3F76";
  } else if (company === "SAP") {
    return "#06ACEA";
  } else if (company === "Siemens") {
    return "#058B8C";
  } else if (company === "Volkswagen") {
    return "#001E50";
  } else if (company === "Vonovia") {
    return "#004658";
  } else {
    console.log(company);
    return "#000000";
  }
}

function mockData(len) {
  let data = [];
  const date = new Date();

  for (let i = 0; i < len; i++) {
    data.push({
      savingsplan: "Sparplan " + i,
      total: Math.floor(Math.random() * 30 + 1) + ",00€",
      date: date.toLocaleDateString(),
    });
  }
  return data;
}

function mockShares(len) {
  let data = [];
  let companies = generateRandomCompany(len);
  const date = new Date();

  for (let i = 0; i < len; i++) {
    data.push({
      company: DAX[companies[i]],
      shares: Math.floor(Math.random() * 20 + 1) + ",00€",
      date: date.toLocaleDateString(),
    });
  }

  return data;
}

function generateRandomCompany(len) {
  let arr = [];
  while (arr.length < len) {
    var r = Math.floor(Math.random() * 30);
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

export { mockData, mockShares, companyColor };
