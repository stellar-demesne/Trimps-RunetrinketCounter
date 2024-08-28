// ==UserScript==
// @name         Runetrinket-Counter
// @namespace    https://github.com/stellar-demesne/Trimps-RunetrinketCounter
// @version      1.0
// @updateURL    https://github.com/stellar-demesne/Trimps-RunetrinketCounter/RunetrinketCounter.user.js
// @description  Runetrinket Counter for Trimps
// @author       StellarDemesne
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'Runetrinket-Counter';
script.src = 'https://stellar-demesne.github.io/Trimps-RunetrinketCounter/RunetrinketCounter.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
