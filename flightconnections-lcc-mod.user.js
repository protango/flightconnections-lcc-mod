// ==UserScript==
// @name         FlightConnections Low Cost Carrier Mod
// @namespace    https://github.com/protango/flightconnections-lcc-mod
// @version      1.0
// @description  Add a low cost carrier selector to flight connections
// @author       protango
// @match        https://www.flightconnections.com/*
// @exclude      /flights.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flightconnections.com
// @grant        none
// @require      https://raw.githubusercontent.com/protango/UserScriptAutomationToolbox/master/waitFor.js
// @updateURL    https://github.com/protango/flightconnections-lcc-mod/raw/main/flightconnections-lcc-mod.user.js
// @downloadURL  https://github.com/protango/flightconnections-lcc-mod/raw/main/flightconnections-lcc-mod.user.js

// ==/UserScript==

(async function () {
  "use strict";
  // Fetched from here: https://en.wikipedia.org/wiki/List_of_low-cost_airlines
  // Using this script:
  /*
    var largestLCCHeading = document.querySelector('span#Largest_low-cost_carriers').parentElement;
    [...document.querySelectorAll('dl dd ul li')].filter(x => x.compareDocumentPosition(largestLCCHeading) === 4).map(x => x.firstChild).filter(x => x.nodeName === 'A').map(x => x.innerText);
  */

  const budgetAirlines = [
    {
      airlineName: "Air Arabia Egypt",
      iataCode: "E5",
    },
    {
      airlineName: "Air Cairo",
      iataCode: "SM",
    },
    {
      airlineName: "FlyEgypt",
      iataCode: "FT",
    },
    {
      airlineName: "Jambojet",
      iataCode: "JM",
    },
    {
      airlineName: "Fly540",
      iataCode: "5G",
    },
    {
      airlineName: "Air Arabia Maroc",
      iataCode: "3O",
    },
    {
      airlineName: "Green Africa Airways",
      iataCode: "Q9",
    },
    {
      airlineName: "FlySafair",
      iataCode: "FA",
    },
    {
      airlineName: "Fastjet",
      iataCode: "FN",
    },
    {
      airlineName: "Fastjet Zimbabwe",
      iataCode: "FN",
    },
    {
      airlineName: "Flybondi",
      iataCode: "FO",
    },
    {
      airlineName: "JetSmart Argentina",
      iataCode: "WJ",
    },
    {
      airlineName: "Azul Brazilian Airlines",
      iataCode: "AD",
    },
    {
      airlineName: "Gol Transportes Aéreos",
      iataCode: "G3",
    },
    {
      airlineName: "Air Canada Rouge",
      iataCode: "RV",
    },
    {
      airlineName: "Canada Jetlines",
      iataCode: "AU",
    },
    {
      airlineName: "Flair Airlines",
      iataCode: "F8",
    },
    {
      airlineName: "Lynx Air",
      iataCode: "Y9",
    },
    {
      airlineName: "Sky Airline",
      iataCode: "H2",
    },
    {
      airlineName: "JetSmart",
      iataCode: "JA",
    },
    {
      airlineName: "Wingo",
      iataCode: "P5",
    },
    {
      airlineName: "Clic Air",
      iataCode: "VE",
    },
    {
      airlineName: "Volaris Costa Rica",
      iataCode: "Q6",
    },
    {
      airlineName: "Air Caraïbes",
      iataCode: "TX",
    },
    {
      airlineName: "AraJet",
      iataCode: "DM",
    },
    {
      airlineName: "RED Air",
      iataCode: "L5",
    },
    {
      airlineName: "Volaris El Salvador",
      iataCode: "N3",
    },
    {
      airlineName: "EasySky",
      iataCode: "",
    },
    {
      airlineName: "Calafia Airlines",
      iataCode: "A7",
    },
    {
      airlineName: "VivaAerobús",
      iataCode: "VB",
    },
    {
      airlineName: "Volaris",
      iataCode: "Y4",
    },
    {
      airlineName: "JetSmart Perú",
      iataCode: "JZ",
    },
    {
      airlineName: "Sky Airline Peru",
      iataCode: "H8",
    },
    {
      airlineName: "InterCaribbean Airways",
      iataCode: "JY",
    },
    {
      airlineName: "Allegiant Air",
      iataCode: "G4",
    },
    {
      airlineName: "Avelo Airlines",
      iataCode: "XP",
    },
    {
      airlineName: "Breeze Airways",
      iataCode: "MX",
    },
    {
      airlineName: "Frontier Airlines",
      iataCode: "F9",
    },
    {
      airlineName: "JetBlue",
      iataCode: "B6",
    },
    {
      airlineName: "Northern Pacific Airways",
      iataCode: "7H",
    },
    {
      airlineName: "Southwest Airlines",
      iataCode: "WN",
    },
    {
      airlineName: "Spirit Airlines",
      iataCode: "NK",
    },
    {
      airlineName: "Sun Country Airlines",
      iataCode: "SY",
    },
    {
      airlineName: "Fly Arna",
      iataCode: "G6",
    },
    {
      airlineName: "FlyOne Armenia",
      iataCode: "3F",
    },
    {
      airlineName: "Buta Airways",
      iataCode: "J2",
    },
    {
      airlineName: "AirAsia Cambodia",
      iataCode: "",
    },
    {
      airlineName: "9 Air",
      iataCode: "AQ",
    },
    {
      airlineName: "Beijing Capital Airlines",
      iataCode: "JD",
    },
    {
      airlineName: "Chengdu Airlines",
      iataCode: "EU",
    },
    {
      airlineName: "Colorful Guizhou Airlines",
      iataCode: "GY",
    },
    {
      airlineName: "China United Airlines",
      iataCode: "KN",
    },
    {
      airlineName: "Jiangxi Air",
      iataCode: "RY",
    },
    {
      airlineName: "Lucky Air",
      iataCode: "8L",
    },
    {
      airlineName: "Ruili Airlines",
      iataCode: "DR",
    },
    {
      airlineName: "Spring Airlines",
      iataCode: "9C",
    },
    {
      airlineName: "Urumqi Air",
      iataCode: "UQ",
    },
    {
      airlineName: "West Air",
      iataCode: "PN",
    },
    {
      airlineName: "Greater Bay Airlines",
      iataCode: "HB",
    },
    {
      airlineName: "HK Express",
      iataCode: "UO",
    },
    {
      airlineName: "Air India Express",
      iataCode: "IX",
    },
    {
      airlineName: "AIX Connect",
      iataCode: "I5",
    },
    {
      airlineName: "Akasa Air",
      iataCode: "QP",
    },
    {
      airlineName: "IndiGo",
      iataCode: "6E",
    },
    {
      airlineName: "SpiceJet",
      iataCode: "SG",
    },
    {
      airlineName: "Citilink",
      iataCode: "QG",
    },
    {
      airlineName: "Indonesia AirAsia",
      iataCode: "QZ",
    },
    {
      airlineName: "Lion Air",
      iataCode: "JT",
    },
    {
      airlineName: "Super Air Jet",
      iataCode: "IU",
    },
    {
      airlineName: "TransNusa",
      iataCode: "8B",
    },
    {
      airlineName: "Wings Air",
      iataCode: "IW",
    },
    {
      airlineName: "Jetstar Japan",
      iataCode: "GK",
    },
    {
      airlineName: "Peach Aviation",
      iataCode: "MM",
    },
    {
      airlineName: "Skymark Airlines",
      iataCode: "BC",
    },
    {
      airlineName: "Spring Airlines Japan",
      iataCode: "IJ",
    },
    {
      airlineName: "Zipair Tokyo",
      iataCode: "ZG",
    },
    {
      airlineName: "FlyArystan",
      iataCode: "KC",
    },
    {
      airlineName: "Air Manas",
      iataCode: "ZM",
    },
    {
      airlineName: "Jazeera Airways",
      iataCode: "J9",
    },
    {
      airlineName: "AirAsia",
      iataCode: "AK",
    },
    {
      airlineName: "AirAsia X",
      iataCode: "D7",
    },
    {
      airlineName: "Firefly",
      iataCode: "FY",
    },
    {
      airlineName: "Salam Air",
      iataCode: "OV",
    },
    {
      airlineName: "Airblue",
      iataCode: "PA",
    },
    {
      airlineName: "Fly Jinnah",
      iataCode: "9P",
    },
    {
      airlineName: "Serene Air",
      iataCode: "ER",
    },
    {
      airlineName: "Air Sial",
      iataCode: "PF",
    },
    {
      airlineName: "Cebu Pacific",
      iataCode: "5J",
    },
    {
      airlineName: "Philippines AirAsia",
      iataCode: "Z2",
    },
    {
      airlineName: "Flynas",
      iataCode: "XY",
    },
    {
      airlineName: "Flyadeal",
      iataCode: "F3",
    },
    {
      airlineName: "Jetstar Asia Airways",
      iataCode: "3K",
    },
    {
      airlineName: "Scoot",
      iataCode: "TR",
    },
    {
      airlineName: "Air Busan",
      iataCode: "BX",
    },
    {
      airlineName: "Air Premia",
      iataCode: "YP",
    },
    {
      airlineName: "Air Seoul",
      iataCode: "RS",
    },
    {
      airlineName: "Eastar Jet",
      iataCode: "ZE",
    },
    {
      airlineName: "Fly Gangwon",
      iataCode: "4V",
    },
    {
      airlineName: "Jeju Air",
      iataCode: "7C",
    },
    {
      airlineName: "Jin Air",
      iataCode: "LJ",
    },
    {
      airlineName: "T'way Air",
      iataCode: "TW",
    },
    {
      airlineName: "Aero K",
      iataCode: "RF",
    },
    {
      airlineName: "Tigerair Taiwan",
      iataCode: "IT",
    },
    {
      airlineName: "Nok Air",
      iataCode: "DD",
    },
    {
      airlineName: "Thai AirAsia",
      iataCode: "FD",
    },
    {
      airlineName: "Thai AirAsia X",
      iataCode: "XJ",
    },
    {
      airlineName: "Thai Lion Air",
      iataCode: "SL",
    },
    {
      airlineName: "Thai Summer Airways",
      iataCode: "9T",
    },
    {
      airlineName: "Thai Vietjet Air",
      iataCode: "VZ",
    },
    {
      airlineName: "Air Arabia",
      iataCode: "G9",
    },
    {
      airlineName: "Air Arabia Abu Dhabi",
      iataCode: "3L",
    },
    {
      airlineName: "flydubai",
      iataCode: "FZ",
    },
    {
      airlineName: "Wizz Air Abu Dhabi",
      iataCode: "5W",
    },
    {
      airlineName: "Pacific Airlines",
      iataCode: "BL",
    },
    {
      airlineName: "VietJet Air",
      iataCode: "VJ",
    },
    {
      airlineName: "Albawings",
      iataCode: "2B",
    },
    {
      airlineName: "EasyJet Europe",
      iataCode: "EC",
    },
    {
      airlineName: "Eurowings Europe",
      iataCode: "E6",
    },
    {
      airlineName: "Smartwings",
      iataCode: "QS",
    },
    {
      airlineName: "French Bee",
      iataCode: "BF",
    },
    {
      airlineName: "Transavia France",
      iataCode: "TO",
    },
    {
      airlineName: "Eurowings",
      iataCode: "EW",
    },
    {
      airlineName: "Wizz Air",
      iataCode: "W6",
    },
    {
      airlineName: "Play",
      iataCode: "OG",
    },
    {
      airlineName: "Ryanair",
      iataCode: "FR",
    },
    {
      airlineName: "Aeroitalia",
      iataCode: "XZ",
    },
    {
      airlineName: "Malta Air",
      iataCode: "AL",
    },
    {
      airlineName: "Lauda Europe",
      iataCode: "LW",
    },
    {
      airlineName: "Wizz Air Malta",
      iataCode: "W4",
    },
    {
      airlineName: "FlyOne",
      iataCode: "5F",
    },
    {
      airlineName: "HiSky",
      iataCode: "H4",
    },
    {
      airlineName: "Transavia",
      iataCode: "TO",
    },
    {
      airlineName: "Norse Atlantic Airways",
      iataCode: "N0",
    },
    {
      airlineName: "Norwegian Air Norway",
      iataCode: "DH",
    },
    {
      airlineName: "Norwegian Air Shuttle",
      iataCode: "DY",
    },
    {
      airlineName: "Buzz",
      iataCode: "RR",
    },
    {
      airlineName: "Air Connect",
      iataCode: "KS",
    },
    {
      airlineName: "Dan Air",
      iataCode: "DN",
    },
    {
      airlineName: "Citrus",
      iataCode: "XT",
    },
    {
      airlineName: "Pobeda",
      iataCode: "DP",
    },
    {
      airlineName: "Smartavia",
      iataCode: "5N",
    },
    {
      airlineName: "Air Europa Express",
      iataCode: "X5",
    },
    {
      airlineName: "Iberia Express",
      iataCode: "I2",
    },
    {
      airlineName: "Level",
      iataCode: "VK",
    },
    {
      airlineName: "Volotea",
      iataCode: "V7",
    },
    {
      airlineName: "Vueling",
      iataCode: "VY",
    },
    {
      airlineName: "Norwegian Air Sweden",
      iataCode: "D8",
    },
    {
      airlineName: "EasyJet Switzerland",
      iataCode: "DS",
    },
    {
      airlineName: "Pegasus Airlines",
      iataCode: "PC",
    },
    {
      airlineName: "AnadoluJet",
      iataCode: "",
    },
    {
      airlineName: "SkyUp",
      iataCode: "PQ",
    },
    {
      airlineName: "EasyJet",
      iataCode: "U2",
    },
    {
      airlineName: "Flypop",
      iataCode: "",
    },
    {
      airlineName: "Jet2.com",
      iataCode: "LS",
    },
    {
      airlineName: "Norse Atlantic UK",
      iataCode: "Z0",
    },
    {
      airlineName: "Ryanair UK",
      iataCode: "RK",
    },
    {
      airlineName: "Wizz Air UK",
      iataCode: "W9",
    },
    {
      airlineName: "Bonza",
      iataCode: "AB",
    },
    {
      airlineName: "Jetstar Airways",
      iataCode: "JQ",
    },
  ];

  await waitForElem(".alliance-options");

  /** @type {HTMLAnchorElement[]} */
  const allOptions = [...document.querySelectorAll(".all-airline-options>a")];

  /** @type {Set<HTMLAnchorElement>} */
  const budgetAirlineAnchors = new Set();

  for (const budgetAirline of budgetAirlines) {
    const airline = allOptions.find((x) =>
      x.innerText.endsWith(`(${budgetAirline.iataCode})`)
    );

    if (airline) {
      budgetAirlineAnchors.add(airline);
    } else {
      console.warn(
        `Could not find airline ${budgetAirline.airlineName} (${budgetAirline.iataCode})`
      );
    }
  }

  // Create the budget alliance
  const lastAlliance = document.querySelector(
    ".alliance-options div.alliance-option:last-child"
  );

  /** @type {HTMLDivElement} */
  const budgetAlliance = lastAlliance.cloneNode();
  budgetAlliance.innerHTML = "Low Cost Carriers";
  budgetAlliance.id = "budget";
  budgetAlliance.setAttribute("data-name", "Low Cost Carriers");
  budgetAlliance.setAttribute("data-fleet", "4");
  lastAlliance.parentElement.appendChild(budgetAlliance);

  const originalSetAllianceFilter = window.setAllianceFilter;
  window.setAllianceFilter = function (e) {
    if (e === "budget") {
      arlfilter.name = "Low Cost Carriers";
      arlfilter.execute("al", 99);
    } else {
      originalSetAllianceFilter(e);
    }
  };

  // Get ids of budget airlines
  const budgetAirlineIds = [...budgetAirlineAnchors].map((x) => x.id);

  // Now we hijack the ajax call and rewrite it
  const originalAjax = $.ajax;
  $.ajax = function (...params) {
    const fakeResult = (() => {
      const e = params[0];
      const url = new URL(e.url);

      if (e.type === "GET" && url.pathname === "/filter_al_99.json") {
        url.pathname = `/filter_ar_${
          budgetAirlineIds[budgetAirlineIds.length - 1]
        }.json`;

        url.searchParams.delete("ids");
        url.searchParams.delete("alliance");
        url.searchParams.delete("airlines");

        e.data.alliance = "";
        e.data.ids = budgetAirlineIds.join(",");
        e.data.airlines = budgetAirlineIds.join(",");
        e.url = url.toString();
      } else if (
        e.type === "GET" &&
        /^\/ro[\d_]+\.json/.test(url.pathname) &&
        (url.searchParams.get("f") === "al99" || e.data.f === "al99")
      ) {
        url.searchParams.delete("ids");
        url.searchParams.delete("alliance");
        url.searchParams.delete("airlines");
        url.searchParams.delete("f");

        e.data.alliance = "";
        e.data.ids = budgetAirlineIds.join(",");
        e.data.airlines = budgetAirlineIds.join(",");
        e.data.f = "ar" + budgetAirlineIds[budgetAirlineIds.length - 1];
        e.url = url.toString();
      }
    })();

    if (fakeResult) {
      return fakeResult;
    }
    return originalAjax(...params);
  };
})();
