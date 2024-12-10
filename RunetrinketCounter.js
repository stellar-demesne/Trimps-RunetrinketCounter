

if (document.getElementById('RunetrinketCounter') === null) {
    const containerRunetrinketCounter = document.createElement('DIV');
    const standard_colours = ' color: rgb(0,0,0); background-color: rgb(255,255,255);';
    const darkmode_colours = ' color: rgb(0,0,0); background-color: rgb(93,93,93);';
    
    let chosen_colours = standard_colours;
    if (game.options.menu.darkTheme.enabled === 2) {
        chosen_colours = darkmode_colours;
    }
	containerRunetrinketCounter.id = 'RunetrinketCounter';
    containerRunetrinketCounter.setAttribute('style', 'display: block; position: absolute; top: 0; right: 0; width: 30%; font-size: 0.58em; text-align: center;' + chosen_colours);
    containerRunetrinketCounter.setAttribute('class', 'noselect');
    containerRunetrinketCounter.setAttribute('onmouseover', RTC_populateRunetrinketCounterTooltip(true));
    containerRunetrinketCounter.setAttribute('onmouseout', 'tooltip("hide")');
	const target_area = document.getElementById('wood');
    target_area.insertBefore(containerRunetrinketCounter, target_area.children[0]);
}

if (game.portal.Observation.radLocked == false) {
    RTC_populateRunetrinketCounterInfo();
    setInterval( function () {
        RTC_populateRunetrinketCounterInfo();
    }, 1000);
}


function RTC_getRunetrinketCountFromGame() {
    return game.portal.Observation.trinkets;
}

function RTC_getRunetrinketMaxFromGame() {
    let trinkets_max = (game.portal.Observation.radLevel + 1) * game.portal.Observation.trinketsPerLevel;
    if (game.global.u2MutationData !== { } && game.global.u2MutationData.Runed) {
        trinkets_max = trinkets_max * 1.5;
    };
    return trinkets_max;
}

function RTC_getRunetrinketEffect() {
    let trinkets = RTC_getRunetrinketCountFromGame()
    let trinkmax = RTC_getRunetrinketMaxFromGame()
    if (trinkmax < trinkets) trinkets = trinkmax;

    const effectiveness_per = game.portal.Observation.radLevel + 1;
    const effectiveness = trinkets * effectiveness_per;
    return prettify(effectiveness);
}

function RTC_getRunetrinketGuaranteedRate() {
    let perklevels = game.portal.Observation.radLevel;
    let halved = Math.floor(perklevels / 2)
    return prettify(halved);
}

function RTC_makeStringForDisplay() {
	if (game.global.universe !== 2) {
		return '';
	}

	const runeTrinkets = game.portal.Observation.trinkets;
	const runeTrinketsMax = RTC_getRunetrinketMaxFromGame();
	if (runeTrinkets >= runeTrinketsMax) {
		return '';
	}

	const runeTrinketString = `${runeTrinkets}<span style="display: block; border-bottom: 1px solid black; margin: 3px 20%;"></span>${runeTrinketsMax}`;
	return runeTrinketString;
}

function RTC_populateRunetrinketCounterTooltip() {
    if (usingRealTimeOffline == true) {
      return '';
    }
  
    let tooltipstring = '';
    tooltipstring = "tooltip('Runetrinket Summary', 'customText', event, '";
    tooltipstring += `<p>Runetrinkets give 1% per runetrinket per perk level, for a current boost of `;
    tooltipstring += prettify(RTC_getRunetrinketCountFromGame()) + ` &times; ` + (game.portal.Observation.radLevel + 1);
    tooltipstring += ` = ` + `<b>+` + RTC_getRunetrinketEffect() + `%</b>.</p>`;

    tooltipstring += `<p>` + game.portal.Observation.getChanceText();
    tooltipstring += ` Also, you are getting a guaranteed <b>` + RTC_getRunetrinketGuaranteedRate() + `</b> every 25 zones past z100.</p>`;
    tooltipstring += "')"
    return tooltipstring
}

function RTC_populateRunetrinketCounterInfo() {    
	if (usingRealTimeOffline) {
		return;
	}

	const target_element = document.getElementById('RunetrinketCounter');

	if (game.portal.Observation.radLocked || game.global.universe != 2) {
		target_element.innerHTML = '';
		return;
	}
	const the_information = RTC_makeStringForDisplay();

	if (target_element.innerHTML !== the_information) target_element.innerHTML = the_information;
	if (the_information !== '') target_element.setAttribute('onmouseover', RTC_populateRunetrinketCounterTooltip());
}
