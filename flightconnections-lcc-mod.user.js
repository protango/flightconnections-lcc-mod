// ==UserScript==
// @name         FlightConnections Low Cost Carrier Mod
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a low cost carrier selector to flight connections
// @author       protango
// @match        https://www.flightconnections.com/*
// @exclude      /flights.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flightconnections.com
// @grant        none
// @require      https://raw.githubusercontent.com/protango/UserScriptAutomationToolbox/master/waitFor.js
// @updateURL    https://github.com/protango/flightconnections-lcc-mod/raw/master/flightconnections-lcc-mod.user.js
// @downloadURL  https://github.com/protango/flightconnections-lcc-mod/raw/master/flightconnections-lcc-mod.user.js

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
    "Air Arabia Egypt",
    "Air Cairo",
    "FlyEgypt",
    "Jambojet",
    "Fly540",
    "Air Arabia Maroc",
    "Green Africa Airways",
    "FlySafair",
    "Fastjet",
    "Fastjet Zimbabwe",
    "Flybondi",
    "JetSmart Argentina",
    "Azul Brazilian Airlines",
    "Gol Transportes Aéreos",
    "Air Canada Rouge",
    "Canada Jetlines",
    "Flair Airlines",
    "Lynx Air",
    "Sky Airline",
    "JetSmart",
    "Wingo",
    "Clic Air",
    "Volaris Costa Rica",
    "Air Caraïbes",
    "AraJet",
    "RED Air",
    "Volaris El Salvador",
    "EasySky",
    "Calafia Airlines",
    "VivaAerobús",
    "Volaris",
    "JetSmart Perú",
    "Sky Airline Peru",
    "InterCaribbean Airways",
    "Allegiant Air",
    "Avelo Airlines",
    "Breeze Airways",
    "Frontier Airlines",
    "JetBlue",
    "Northern Pacific Airways",
    "Southwest Airlines",
    "Spirit Airlines",
    "Sun Country Airlines",
    "Fly Arna",
    "FlyOne Armenia",
    "Buta Airways",
    "AirAsia Cambodia",
    "9 Air",
    "Beijing Capital Airlines",
    "Chengdu Airlines",
    "Colorful Guizhou Airlines",
    "China United Airlines",
    "Jiangxi Air",
    "Lucky Air",
    "Ruili Airlines",
    "Spring Airlines",
    "Urumqi Air",
    "West Air",
    "Greater Bay Airlines",
    "HK Express",
    "Air India Express",
    "AIX Connect",
    "Akasa Air",
    "IndiGo",
    "SpiceJet",
    "Citilink",
    "Indonesia AirAsia",
    "Lion Air",
    "Super Air Jet",
    "TransNusa",
    "Wings Air",
    "Jetstar Japan",
    "Peach Aviation",
    "Skymark Airlines",
    "Spring Airlines Japan",
    "Zipair Tokyo",
    "FlyArystan",
    "Air Manas",
    "Jazeera Airways",
    "AirAsia",
    "AirAsia X",
    "Firefly",
    "Salam Air",
    "Airblue",
    "Fly Jinnah",
    "Serene Air",
    "Air Sial",
    "Cebu Pacific",
    "Philippines AirAsia",
    "Flynas",
    "Flyadeal",
    "Jetstar Asia Airways",
    "Scoot",
    "Air Busan",
    "Air Premia",
    "Air Seoul",
    "Eastar Jet",
    "Fly Gangwon",
    "Jeju Air",
    "Jin Air",
    "T'way Air",
    "Aero K",
    "Tigerair Taiwan",
    "Nok Air",
    "Thai AirAsia",
    "Thai AirAsia X",
    "Thai Lion Air",
    "Thai Summer Airways",
    "Thai Vietjet Air",
    "Air Arabia",
    "Air Arabia Abu Dhabi",
    "flydubai",
    "Wizz Air Abu Dhabi",
    "Pacific Airlines",
    "VietJet Air",
    "Albawings",
    "EasyJet Europe",
    "Eurowings Europe",
    "Smartwings",
    "French Bee",
    "Transavia France",
    "Eurowings",
    "Wizz Air",
    "Play",
    "Ryanair",
    "Aeroitalia",
    "Malta Air",
    "Lauda Europe",
    "Wizz Air Malta",
    "FlyOne",
    "HiSky",
    "Transavia",
    "Norse Atlantic Airways",
    "Norwegian Air Norway",
    "Norwegian Air Shuttle",
    "Buzz",
    "Air Connect",
    "Dan Air",
    "Citrus",
    "Pobeda",
    "Smartavia",
    "Air Europa Express",
    "Iberia Express",
    "Level",
    "Volotea",
    "Vueling",
    "Norwegian Air Sweden",
    "EasyJet Switzerland",
    "Pegasus Airlines",
    "AnadoluJet",
    "SkyUp",
    "EasyJet",
    "Flypop",
    "Jet2.com",
    "Norse Atlantic UK",
    "Ryanair UK",
    "Wizz Air UK",
    "Bonza",
    "Jetstar Airways",
    "Antinea Airlines",
    "Ecoair International",
    "Atlas Blue",
    "Jet4you",
    "Fastjet Mozambique",
    "1time",
    "Mango",
    "Velvet Sky",
  ];

  const budgetExceptions = new Set([
    'Iberia (IB)',
    'United Airlines (UA)',
    'Air Canada (AC)'
  ]);
  // const budgetAirlines = ['qantas'];

  await waitForElem(".alliance-options");

  /** @type {HTMLAnchorElement[]} */
  const allOptions = [...document.querySelectorAll(".all-airline-options>a")];

  const bannedKeywords = new Set([
    "airline",
    "airlines",
    "airways",
    "air",
    "el",
  ]);
  /** @type {Set<HTMLAnchorElement>} */
  const budgetAirlineAnchors = new Set();

  for (const budgetAirline of budgetAirlines) {
    const procBudget = budgetAirline
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");
    const budgetWords = new Set(procBudget.split(" "));
    const budgetWordsNoBanned = new Set(
      [...budgetWords].filter((x) => !bannedKeywords.has(x))
    );

    let hits = [""].slice(0, 0);
    for (const option of allOptions) {
      if (budgetExceptions.has(option.innerText)) {
        continue;
      }
      // strip suffix "... (XX)" from option
      const procOption = option.innerText
        .replace(/\s*\(\w+\)\s*$/, "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "");

      // First check for exact match
      if (procOption === procBudget) {
        budgetAirlineAnchors.add(option);
        hits.push(option.innerText);
        continue;
      }

      // Then check for partial match (2 or more words in common) without banned keywords
      const procWords = new Set(procOption.split(" "));
      const procWordsNoBanned = new Set(
        [...procWords].filter((x) => !bannedKeywords.has(x))
      );
      const intersectionNoBanned = new Set(
        [...procWordsNoBanned].filter((x) => budgetWordsNoBanned.has(x))
      );
      if (intersectionNoBanned.size >= 2) {
        budgetAirlineAnchors.add(option);
        hits.push(option.innerText);
        continue;
      }

      // Lastly, we handle the case where the budget airline is a substring of the option or vice versa
      // We mark the word voundaries in each string to ensure that we don't match substrings of words
      const procBudgetWithBoundaries = procBudget.replace(/\b/g, "\t\t");
      const procOptionWithBoundaries = procOption.replace(/\b/g, "\t\t");
      if (
        procBudgetWithBoundaries.includes(procOptionWithBoundaries) ||
        procOptionWithBoundaries.includes(procBudgetWithBoundaries)
      ) {
        budgetAirlineAnchors.add(option);
        hits.push(option.innerText);
        continue;
      }
    }

    /*
      if (hits.length === 0) {
        console.log(`No match for ${budgetAirline}`);
      }
      if (hits.length > 1) {
        console.log(`Multiple matches for ${budgetAirline}`);
      }
      */
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
