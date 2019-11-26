/*
 *
 * Copyright 2019 @ Jacob Baloul <jacob@stabilityfocus.com>
 *     serverlessjs.io
 *
*/
//////////////////
// GLOBAL VARIABLES

// app_type == "d8"
if (app_type == '') { var app_type="native" };

  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); //setDate also supports negative values, which cause the month to rollover.

  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  var today = yyyy + '-' + mm + '-' + dd;
  //////// 
  var y_dd = yesterday.getDate();
  var y_mm = yesterday.getMonth() + 1; //January is 0!
  var y_yyyy = yesterday.getFullYear();
  if (y_dd < 10) {
    y_dd = '0' + y_dd;
  } 
  if (y_mm < 10) {
    y_mm = '0' + y_mm;
  } 
  var yesterday = y_yyyy + '-' + y_mm + '-' + y_dd;


//
//
//
//////////////////
//////////////////
// FUNCTIONS
//////////////////
//////////////////
//////////////////
// Integration functions for progressively decoupling drupal
//////////////////
//////////////////
function hideD8h1() {

if ( app_type == "d8" ) {
// JS selector
var divs = document.querySelector('body > div.dialog-off-canvas-main-canvas > div > div > section > div.region.region-content > h1');

// if is not defined
if ( divs !== null ) {
            divs.style.display = 'none';
  }
 }
}
//////////////////
//////////////////
function fixD8styles() {
if ( app_type == "d8" ) {
  var widget = document.querySelector('#widget-personalized-channels-dropdown')
  widget.style.top = '-50px';
 }
}
//////////////////
//////////////////
// menu functions
//////////////////
//////////////////
function buildMenuHTML() {
  let interfaceDisplay = document.querySelector("#bznav");

  let NavMenuHTML = 
      "<ul id='bznav' class='nav navbar-nav navbar-right'>" + '\n' +
        "<li><a href='#' class='' id='btn-home' onClick=bzHome() >Home</a></li>" + '\n' +
        "<li><a href='#' class='' id='btn-channels' onClick=bzChannels() >Channels</a></li>" + '\n' +
        "<li><a href='#' class='' id='btn-personalize' onClick=bzPersonalized('All','66','','display-buzzwords-personalized') >Personalize</a></li>" + '\n' + // set defaults TODO: add logic to save in session cookie to remember last choices
        // "<li><a href='#' class='' id='btn-personalize' onClick=bzPersonalized('','','','display-buzzwords-personalized') >Personalize</a></li>" + '\n' + // set defaults TODO: add logic to save in session cookie to remember last choices
        // "<li><a href='#' class='' id='btn-headlines' onClick=bzHeadlines('','All','" + yesterday + "','" + today + "','display-headlines') >Headlines</a></li>" + '\n' + // set defaults
        "<li><a href='#' class='' id='btn-headlines' onClick=bzHeadlines('','','" + yesterday + "','" + today + "','display-headlines') >Headlines</a></li>" + '\n' + // set defaults
        "<li><a target='_blank' href='https://www.amazon.com/dp/B072N5TP2C/ref=sr_1_1?ie=UTF8&amp;keywords=buzzwords&amp;qid=1497525708&amp;s=digital-skills&amp;sr=1-1' title='&quot;Alexa, Buzz Words&quot;'>Alexa Skill</a></li>" + '\n' +
        "<li id='block-menulogo'>" + '\n' +
          "<p><img alt='serverlessjs.io' data-entity-type='file' height='220' src='https://s3.amazonaws.com/prod-buzzwords/images/buzzword-today-MetaTron-Logo-v1-ice-worlds-fire-magen-tiferet-transparent-logo.png' width='203' class='align-center' /></p>" + '\n' +
        "</li>" + '\n' +
      "</ul>" + '\n'
;

        // <!-- <li class="active"><a href="#" class="" id="btn-home" onClick="bzHome()">Home</a></li> -->

  interfaceDisplay.outerHTML = NavMenuHTML;

}
//////////////////
function closeMenu() {
 
if (app_type != "d8") {  
  // because we are using checkbox hack to do hamburger in pure js, we need to uncheck / check to toggle menu
  // css has related hack, search style.css for navbar-toggle-cbox
  document.getElementById("navbar-toggle-cbox").checked = false;
}


}
//////////////////
//////////////////
// page functions
//////////////////
//////////////////
function bzHome() {

// hide h1 on decoupled d8
hideD8h1();

  /* function to place the html on the page */
  let interfaceDisplay = document.querySelector("#bzface");

  let HomeHTML = ` 

        <div id="bzhome-animation">
        <div style="margin:0px auto 20px auto;">
        <h1 class="bz-h1">Dashboard</h1>
        </div>

        <div id="home-banner-top">
        <div id='display-buzzwords-last-updated'></div>
        <div id='display-buzzwords-situation'></div>
        </div>

        <div class="refresh-btn-wrapper">
        <a href="#" class="btn btn-primary" id="retrieve-resources" onClick="refreshHome()"><span id="refresh-spin" class="glyphicon glyphicon-refresh"></span> Refresh</a>
        <br/>
        </div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #All</h2>
		<div id="display-buzzwords-all" class="display-buzzwords style-7"></div>
	</div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #CNN</h2>
		<div id="display-buzzwords-cnn" class="display-buzzwords style-7"></div>
	</div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #Fox</h2>
		<div id="display-buzzwords-fox" class="display-buzzwords style-7"></div>
	</div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #Business</h2>
		<div id="display-buzzwords-business" class="display-buzzwords style-7"></div>
	</div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #Technology</h2>
		<div id="display-buzzwords-technology" class="display-buzzwords style-7"></div>
	</div>

	<div class="buzzwords-wrapper">
		<h2 class="bz-h2">Top 100 Buzzwords Today in #Sports</h2>
		<div id="display-buzzwords-sports" class="display-buzzwords style-7"></div>
	</div>
	</div>
`;
  // Display Home HTML
  interfaceDisplay.innerHTML = HomeHTML;

  // Populate with Ajax
  refreshHome()

  // Close Menu on mobile after click
  closeMenu();

}
//////////////////
//////////////////
function refreshHome() {
  // Make Ajax calls to populate Home HTML
  // getBuzzwords('channel','channelid','display');
  getBuzzwords('All','66','display-buzzwords-all');
  getBuzzwords('Business','21','display-buzzwords-business');
  getBuzzwords('Technology','31','display-buzzwords-technology');
  getBuzzwords('Sports','36','display-buzzwords-sports');
  getBuzzwords('CNN','46','display-buzzwords-cnn');
  getBuzzwords('Fox','41','display-buzzwords-fox');
  // TODO: make channelid dynamic in Personalize page

  getLastUpdated('All','66','display-buzzwords-last-updated');
  getSituation('All','66','display-buzzwords-situation');

  // make glyphicon-refresh spin on click
  // document.getElementById("refresh-spin").classList.add("glyphicon-refresh-spin");
  // document.getElementById("refresh-spin").classList.remove("glyphicon-refresh-spin");
  document.getElementById("refresh-spin").classList.toggle("glyphicon-refresh-spin");

}
//////////////////
function getSituation(channel,channelid,display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var DISPLAYID = "#" + display;
  
  const url = 'https://getbuzzwords.api.buzzwords.news/Prod?channel=' + API_CHANNEL + '&day=' + API_DAY ; // ?channel=CNN&day=2019-04-04'; // bz api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='medium-loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>...no results for channel: #" + API_CHANNEL + "</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div id='display-buzzwords-situation' class='well well-sm'>" + '\n' ;

      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

        output +=
          "<h1>The Situation in the World is :: <br>" + '\n' +
           // put this score in a visualized speedometer widget _\|/_
           // result.Items[0].channel_hdlines_pstvty_scr
	  "<span class='situation-scr'>" + result.Items[0].chnl_hdlns_pstvty_scr_txt + "</span><br>" + '\n' +
          "</h1>" + '\n' +
	  '\n'

      output += "</div>";
      // output += "<br><br>";
      displayResources.outerHTML = output;
    }
  });
};
//////////////////
function getLastUpdated(channel,channelid,display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var DISPLAYID = "#" + display;
  
  const url = 'https://getbuzzwords.api.buzzwords.news/Prod?channel=' + API_CHANNEL + '&day=' + API_DAY ; // ?channel=CNN&day=2019-04-04'; // bz api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='medium-loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>...no results for channel: #" + API_CHANNEL + "</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div id='display-buzzwords-last-updated' class='well well-sm'>" + '\n' ;

      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

        output +=
          "<h3>Last Updated:</h3>" + '\n' +
	  "<strong>" + result.Items[0].buzzword_calc_time + "</strong><br>" + '\n' +
	  '\n'

      output += "</div>";
      // output += "<br><br>";
      displayResources.outerHTML = output;
    }
  });
};
//////////////////
function getBuzzwords(channel,channelid,display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var DISPLAYID = "#" + display;
  
  // curl -s 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=All&day=2019-04-04&page=0' | jq .Items[].buzzword
  // const url = 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=CNN&day=2019-04-04'; // bz api
  // const url = 'https://v36b2odoc6.execute-api.us-east-1.amazonaws.com/Prod'; // ?channel=CNN&day=2019-04-04'; // bz api
  const url = 'https://getbuzzwords.api.buzzwords.news/Prod?channel=' + API_CHANNEL + '&day=' + API_DAY ; // ?channel=CNN&day=2019-04-04'; // bz api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>...no results for channel: #" + API_CHANNEL + "</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div class='table-responsive'>" + '\n' +
	"<table class='table table-hover table-striped'>" + '\n' +
	'\t' + "<tbody>";
      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

      for (let i in result.Items) {
        output +=
	  "<tr>" + '\n' + 
	  "<td>" + '\n' +
	  "<div class='buzzword-container'>" + '\n' +
	  "<div class='side-a'>" + '\n' +
          "<strong>buzzword:</strong>" + '\n';

        // Integration Logic :: The Coupling Point
        if (app_type == "d8") {
          output +=
            // pass routing to drupal :: the coupling point
            // DONE: move from progressively decoupled, to fully decoupled, or make it work in both
            // drupal decoupled link, todo: build new link after Personalize page is done
            //<h1><a href="/headlines?buzzword=%5B%5B%3A%3C%3A%5D%5DTrump%5B%5B%3A%3E%3A%5D%5D&amp;channel=66">Trump</a></h1>
	    "<h1><a href='/headlines?buzzword=%5B%5B%3A%3C%3A%5D%5D" + result.Items[i].buzzword + "%5B%5B%3A%3E%3A%5D%5D&amp;channel=" + API_CHANNELID + "'>" + result.Items[i].buzzword + "</a></h1>" + '\n';
        } else {
          output +=
            // bzHeadlines(buzzword,channel,start_date,end_date,display)
	    "<h1><a href='#' onclick=bzHeadlines('" + result.Items[i].buzzword + "','" + API_CHANNEL + "','" + result.Items[i].start_date + "','" + result.Items[i].end_date + "','display-headlines') >" + result.Items[i].buzzword + "</a></h1>" + '\n';
        }

          output +=
	  "<strong>" + result.Items[i].buzzword_day_count + "</strong>"  + " mentions, <br>" + '\n' +
	  "with " + "<strong>" + result.Items[i].pstvity_score_txt + "</strong>" + " sentiment, <br>" + '\n' +
	  "in " + "<strong>" + result.Items[i].buzzword_headline_cnt + " #" + result.Items[i].channel + "</strong>" + " headlines, <br>" + '\n' +
	  "containing " + "<strong>" + result.Items[i].buzzword_wordsread_cnt + "</strong>" + " words, <br>" + '\n' + 
	  "on " + result.Items[i].day + "<br>" + '\n' +
	  "</div>" + '\n' +

	  "<div class='side-b'>" + '\n' +
	  "score:" + '\n' +
	  "<strong>" + result.Items[i].buzzword_score + "</strong><br>" + '\n' +
	  result.Items[i].buzzword_calc_time + '\n' + 
	  // timeSince(result.Items[i].buzzword_calc_time) + '\n' + 
          // time_ago(result.Items[i].buzzword_calc_time - aDay * 2) + '\n' +
          // time_ago(new Date(result.Items[i].buzzword_calc_time - aDay * 2)) + '\n' +
	  "</div><div class='float-clear'></div></div></td></tr>" + '\n' +
	  // "</div></div>" + '\n' +
	  '\n'
      }

      output += "</table>";
      // output += "<br><br>";
      displayResources.innerHTML = output;
    }
  });
};
//////////////////
function bzChannels() {

// hide h1 on decoupled d8
hideD8h1();

  /* function to place the html on the page */
  let interfaceDisplay = document.querySelector("#bzface");

  let ChannelsHTML = ` 

        <div id="bzchannels-animation">
        <div style="margin:0px auto 20px auto;">
        <h1 class="bz-h1">Channels</h1>
        </div>

        <div class="refresh-btn-wrapper">
        <a href="#" class="btn btn-primary" id="retrieve-resources" onClick="refreshChannels()"><span id="refresh-spin" class="glyphicon glyphicon-refresh"></span> Refresh</a>
        <br/>
        </div>

	<div class="channels-wrapper">
		<!-- <h2>Channels</h2> -->
		<div id="display-channel-stats" class="display-buzzwords-channels style-7">#Channels Stats</div>
	</div>
        </div>
`;
  // Display Channels HTML
  interfaceDisplay.innerHTML = ChannelsHTML;

  // Populate with Ajax
  refreshChannels();

  // Close Menu on mobile after click
  closeMenu();

}
//////////////////
function refreshChannels() {
  // Make Ajax calls to populate Home HTML
  // getBuzzwords('channel','display');
  // getBuzzwords('All','display-buzzwords-all');
  // getChannels('day','display');
  // getChannels('day','display');
  getChannels('display-channel-stats');

  // make glyphicon-refresh spin on click
  // document.getElementById("refresh-spin").classList.add("glyphicon-refresh-spin");
  // document.getElementById("refresh-spin").classList.remove("glyphicon-refresh-spin");
  document.getElementById("refresh-spin").classList.toggle("glyphicon-refresh-spin");
 
}
//////////////////
//////////////////
// function getChannels(day,display) {
function getChannels(display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today

  // var API_DAY = day; // TODO: add support for passing day from front end date picker to backend api param as API_DAY, for now, api is defaulting to today
  var DISPLAYID = "#" + display;
  
  // curl -s 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=All&day=2019-04-04&page=0' | jq .Items[].buzzword
  // const url = 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=CNN&day=2019-04-04'; // bz api
  // const url = 'https://v36b2odoc6.execute-api.us-east-1.amazonaws.com/Prod'; // ?channel=CNN&day=2019-04-04'; // bz api
  // const url = 'https://v36b2odoc6.execute-api.us-east-1.amazonaws.com/Prod?channel=' + API_CHANNEL ; // ?channel=CNN&day=2019-04-04'; // bz api
  // const url = 'https://v36b2odoc6.execute-api.us-east-1.amazonaws.com/Prod?day=' + API_DAY ; // ?day=2019-04-04'; // bz channels api
  const url = 'https://bzchannels.api.buzzwords.news/Prod?day=' + API_DAY ; // ?day=2019-04-04'; // bz channels api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>calculating...</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div class='table-responsive'>" + '\n' +
	"<table class='table table-hover table-striped'>" + '\n' +
	'\t' + "<tbody>";
      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

      for (let i in result.Items) {
        output +=
	  "<tr>" + '\n' + 
	  "<td>" + '\n' +
	  "<div class='buzzword-container'>" + '\n' +
	  "<div class='side-a'>" + '\n' +
	  "<h1>" + '\n' +

          // bzPersonalized('channel','channelid','buzzword','display');
          // bzPersonalized('All','66','Trump','display-buzzwords-personalized');
          "<a href='#' " +
              "onClick=bzPersonalized('" + result.Items[i].channel + "','" + result.Items[i].channelid + "','','display-buzzwords-personalized')>#" + result.Items[i].channel + "</a>" + '\n' + 

          // drupal decoupled link, todo: build new link after Personalize page is done
          // <a href="/top-buzzwords?channel=66">#All</a>
          // "<a href='/top-buzzwords?channel=" + result.Items[i].channelid + "'>#" + result.Items[i].channel + "</a>" + '\n' +
          "</h1>" + '\n' +
	  "channel positivity::" + "<strong>" + result.Items[i].chnl_hdlns_pstvty_scr_txt + "</strong><br>" + '\n' + 
	  "contains:: " + "<strong>" + result.Items[i].buzzword_cnt + " buzzwords</strong> in <strong>" + result.Items[i].buzzword_headline_cnt + " headlines</strong> with " + result.Items[i].buzzword_wordsread_cnt + " words.<br>" + '\n' + 
	  "</div>" + '\n' +

	  "<div class='side-b'>" + '\n' +
	  // "score:" + '\n' +
	  // "<strong>" + result.Items[i].buzzword_score + "</strong><br>" + '\n' +
	  // result.Items[i].buzzword_calc_time + '\n' + 
	  // timeSince(result.Items[i].buzzword_calc_time) + '\n' + 
          // time_ago(result.Items[i].buzzword_calc_time - aDay * 2) + '\n' +
          // time_ago(new Date(result.Items[i].buzzword_calc_time - aDay * 2)) + '\n' +
	  "</div><div class='float-clear'></div></div></td></tr>" + '\n' +
	  // "</div></div>" + '\n' +
	  '\n'



// v1
//<h1>{{ field_tags_1 }}</h1>
//channel positivity:: <strong>{{ field_chnl_hdlns_pstvty_scr_txt }} </strong></br>
//contains:: <strong>{{ field_buzzword }} buzzwords</strong> in <strong>{{ field_result_bzzwrd_headline_cnt|number_format(0, '.', ',') }} </strong> headlines


      }

      output += "</table>";
      // output += "<br><br>";
      displayResources.innerHTML = output;
    }
  });
};
//////////////////
//////////////////
// function bzHeadlines() {
function bzHeadlines(buzzword,channel,start_date,end_date,display) { 

  var API_BUZZWORD = buzzword;
  // var API_DAY = day; // TODO: add support for passing day from front end date picker to backend api param as API_DAY, for now, api is defaulting to today
  // var API_START_DATE = '2019-04-24';
  var API_START_DATE = start_date;
  // var API_END_DATE = '2019-04-25';
  var API_END_DATE = end_date;
  // var API_CHANNEL = 'All';
  var API_CHANNEL = channel; 


  /* function to place the html on the page */
  let interfaceDisplay = document.querySelector("#bzface");

  let HeadlinesHTML = 

        "<div id='bzheadlines-animation'>" + '\n' +
        "<div style='margin:0px auto 20px auto;'>" + '\n' +
        "<h1 class='bz-h1'>Headlines" + '\n' ;
      
        // <a href="#" onclick="bzPersonalized('All','66','Trump','display-buzzwords-personalized')">#All</a> 
        if ( API_CHANNEL != '' ) { 
          HeadlinesHTML += 
            "<p style='line-height:0.4;'>" + 
              "<span class='h1-sub'>in :: <strong>" +
                "<a href='#' style='padding:15px;' onclick=bzPersonalized('" + API_CHANNEL + "','','','display-buzzwords-personalized') >#" + API_CHANNEL + "</a></strong></span>" + 
            "</p>" + '\n' 
        };
        if ( API_BUZZWORD != '' ) { 
          HeadlinesHTML += 
            "<p style='line-height:0.4;'>" +
              "<span class='h1-sub'>with buzzword :: <strong>" + 
              // bzHeadlines(buzzword,channel,start_date,end_date,display)
              "<a href='#' style='padding:15px;' onclick=bzHeadlines('" + API_BUZZWORD + "','','','','display-headlines') >" + API_BUZZWORD + "</a></strong></span>" +
            "</p>" + '\n' 
        };

        HeadlinesHTML += 
        "</h1>" + '\n' +
        "</div>" + '\n' +

        "<div class='refresh-btn-wrapper'>" + '\n' +
        "<a href='#' class='btn btn-primary' id='retrieve-resources' onClick=refreshHeadlines('" + API_BUZZWORD + "','" + API_CHANNEL + "','" + API_START_DATE + "','" + API_END_DATE + "','" + display + "')><span id='refresh-spin' class='glyphicon glyphicon-refresh'></span> Refresh</a>" + '\n' +
        "<br/>" + '\n' +
        "</div>" + '\n' +

	"<div class='buzzwords-wrapper'>" + '\n' +
		// <!-- <h2>Headlines</h2> -->
		"<div id='display-headlines' class='display-buzzwords style-7'>Headlines</div>" + '\n' +
	"</div>" + '\n' +
        "</div>" + '\n' ;
  // Display Channels HTML
  interfaceDisplay.innerHTML = HeadlinesHTML;

  // Populate with Ajax
  refreshHeadlines(API_BUZZWORD,API_CHANNEL,API_START_DATE,API_END_DATE,display)

  // Close Menu on mobile after click
  closeMenu();

}
//////////////////
function refreshHeadlines(buzzword,channel,start_date,end_date,display) {
  // Make Ajax calls to populate Home HTML
  // getBuzzwords('channel','display');
  // getBuzzwords('All','display-buzzwords-all');
  // getChannels('day','display');
  // getChannels('day','display');
  // getHeadlines('display-headlines');
  getHeadlines(buzzword,channel,start_date,end_date,display)

  // make glyphicon-refresh spin on click
  // document.getElementById("refresh-spin").classList.add("glyphicon-refresh-spin");
  // document.getElementById("refresh-spin").classList.remove("glyphicon-refresh-spin");
  document.getElementById("refresh-spin").classList.toggle("glyphicon-refresh-spin");

}
//////////////////
//////////////////
// function getHeadlines(day,channel,display) {
// function getHeadlines(display) {
function getHeadlines(buzzword,channel,start_date,end_date,display) {

  var API_BUZZWORD = buzzword;
  // var API_DAY = day; // TODO: add support for passing day from front end date picker to backend api param as API_DAY, for now, api is defaulting to today
  // var API_START_DATE = '2019-04-24';
  var API_START_DATE = start_date;
  // var API_END_DATE = '2019-04-25';
  var API_END_DATE = end_date;
  // var API_CHANNEL = 'All';
  var API_CHANNEL = channel; 
  var LIMIT = 100;
  var PAGE_CNT = 0;
  var DISPLAYID = "#" + display;
  
  const url = 'https://buzzwords.news/api/headlines2?buzzword='+ API_BUZZWORD + '&name=' + API_CHANNEL + '&tag=' + API_CHANNEL + '&timestamp%5Bmin%5D=' + API_START_DATE + '&timestamp%5Bmax%5D=' + API_END_DATE + '&items_per_page=' + LIMIT + '&page=' + PAGE_CNT + '&_format=hal_json'

  // curl -s 'http://buzzwords.technology/api/headlines2?buzzword=Rabbi&channel=66&_format=hal_json' | jq
  // export CHANNEL_TAG=All ; export START_DATE="2019-04-23" ; export END_DATE="2019-04-24" ; export LIMIT=100 ; export PAGE_CNT=0; curl -s "${URL}/api/headlines2?buzzword=Rabbi&name=${CHANNEL_NAME}&tag=${CHANNEL_TAG}&timestamp%5Bmin%5D=${START_DATE}&timestamp%5Bmax%5D=${END_DATE}&items_per_page=${LIMIT}&page=${PAGE_CNT}&_format=hal_json" | jq

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='loader'></div>";

  // fetch(url, {mode: 'cors'})
  // fetch(url, {mode: 'no-cors'})
/*
  fetch(url,{
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          // 'X-Content-Type-Options': 'nosniff',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache',
          // "Content-Type": "application/json",
          "Content-Type": "application/hal+json"
          // 'Access-Control-Allow-Origin':'*'
      })
  }) */
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    // if (result.Items[0] == null) {
    if (result[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>calculating...</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {


/*
      // DEBUG ::
      // let output = result;
      // output += result;
      // output += JSON.stringify(result);
      let output = 
         "<pre>" + '\n' + 

      for (let i in result) {
        output +=
	  "<h1>" + result[i].title + "</h1>" + '\n' +
	  "channels::" + "<strong>" + result[i].field_feed_tag + "</strong><br>" + '\n' + 
	  '\n'
      }
      output += "</pre>";
*/

/*
  {
    "title": "Snap starts adding users again",
    "timestamp": "1556057397",
    "postedby_fid_name": "#CNN Most Recent",
    "field_feed_tag": "#All, #World, #Latest, #News, #CNN",
    "feed_link": "http://rss.cnn.com/~r/rss/cnn_latest/~3/7zgwSmuQct4/index.html",
    "langcode": "en",
    "fid": "61"
  }
*/

      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div>" + '\n';
      // for (let i in result.Items) {
      for (let i in result) {
        output +=
	  // "<div class='buzzword-container'>" + '\n' +
	  "<div class='well'>" + '\n' +
	  "<h1 style='font-size:25px;'><a target='_blank' href='" + result[i].feed_link + "' >" + result[i].title + "</a></h1>" + '\n' +
	  "posted::" + "<strong>" + result[i].timestamp + "</strong><br>" + '\n' + 
	  "by::" + "<strong>" + result[i].postedby_fid_name + "</strong><br>" + '\n' + 
	  "channels::" + "<strong>" + result[i].field_feed_tag + "</strong><br>" + '\n' + 
	  "</div>" + '\n' +
	  '\n'
/*
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div class='table-responsive'>" + '\n' +
	"<table class='table table-hover table-striped'>" + '\n' +
	'\t' + "<tbody>";
      // for (let i in result.Items) {
      for (let i in result) {
        output +=
	  "<tr>" + '\n' + 
	  "<td>" + '\n' +
	  "<div class='buzzword-container'>" + '\n' +
	  "<div class='side-a'>" + '\n' +
	  "<h1>" + result[i].title + "</h1>" + '\n' +
	  "channels::" + "<strong>" + result[i].field_feed_tag + "</strong><br>" + '\n' + 
	  "</div>" + '\n' +

	  "<div class='side-b'>" + '\n' +
	  "</div><div class='float-clear'></div></div></td></tr>" + '\n' +
	  '\n'
*/
      }

      output += "</div>";
      // output += "</table>";
      // output += "<br><br>";

      displayResources.innerHTML = output;
    }
  });
};
//////////////////
//////////////////
function bzPersonalized(channel,channelid,buzzword,display) {

// hide h1 on decoupled d8
hideD8h1();

  // bzPersonalized(channel,channelid,buzzword,display);
  // bzPersonalized('All','66','Trump','display-buzzwords-personalized');
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var API_BUZZWORD = buzzword;
  var DISPLAYID = display;

  let PersonalizedHTML = 


        "<div id='bzhome-animation'>" + '\n' +

        "<div style='margin:0px auto 20px auto'>" + '\n' +
            "<h1 class='bz-h1'>Personalized Dashboard</h1>" + '\n' +
                 "<div id='hook-buildPersonalizedMenu'></div>" + '\n' +
        "</div>" + '\n' +

        "<div class='refresh-btn-wrapper'>" + '\n' +

        "<div id='hook-btn-refreshPersonalized'>" + '\n' +
            "<a href='#' class='btn btn-primary' id='retrieve-resources' onClick=refreshPersonalized('" + API_CHANNEL + "','" + API_CHANNELID + "','" + API_BUZZWORD + "','" + DISPLAYID + "')><span id='refresh-spin' class='glyphicon glyphicon-refresh'></span> Refresh</a>" + '\n' +
            "<br/>" + '\n' +
        "</div>" + '\n' +

        "</div>" + '\n' +

	"<div class='buzzwords-wrapper-personalized'>" + '\n' +
		"<h2 id='hook-personalized-subtitle' class='bz-h2'>Top 100 Buzzwords Today</h2>" + '\n' +
        "<div id='display-buzzwords-personalized' class='display-buzzwords style-7'></div>" + '\n' +
	"</div>" + '\n' +
	"</div>" + '\n';

  /* function to place the html on the page */
  let interfaceDisplay = document.querySelector("#bzface");

  // Display Home HTML
  interfaceDisplay.innerHTML = PersonalizedHTML;

  // Populate with Ajax
  refreshPersonalized(API_CHANNEL,API_CHANNELID,API_BUZZWORD,DISPLAYID);

  // Create dropdown widget
  buildPersonalizedMenu();

  // Close Menu on mobile after click
  closeMenu();

}
//////////////////
function refreshPersonalized(channel,channelid,buzzword,display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var API_BUZZWORD = buzzword;
  var DISPLAYID = display;
 
  // Make Ajax calls to populate Home HTML
  // getBuzzwords('channel','channelid','display');
  // getBuzzwordsPersonalized('All','66','display-buzzwords-personalized');
  getBuzzwordsPersonalized(API_CHANNEL,API_CHANNELID,API_BUZZWORD,DISPLAYID);
  // TODO: make channelid dynamic in Personalize page
  // accept input params from drop down ui

  // make glyphicon-refresh spin on click
  // document.getElementById("refresh-spin").classList.add("glyphicon-refresh-spin");
  // document.getElementById("refresh-spin").classList.remove("glyphicon-refresh-spin");
  document.getElementById("refresh-spin").classList.toggle("glyphicon-refresh-spin");

  //
  // set personalized subtitle
  let interfaceDisplay = document.querySelector("#hook-personalized-subtitle");
  var hookPersonalizedSubtitleHTML = "<h2 id='hook-personalized-subtitle' class='bz-h2'>Top 100 Buzzwords Today" + '\n';
        if ( API_CHANNEL != '' ) { 
          hookPersonalizedSubtitleHTML += 
            "<p style='line-height:0.4;'>" + 
              "<span class='h1-sub'>in :: <strong>" +
                "<a href='#' style='padding:15px;' onclick=bzPersonalized('" + API_CHANNEL + "','','','display-buzzwords-personalized') >#" + API_CHANNEL + "</a></strong></span>" + 
            "</p>" + '\n' 
        };
        if ( API_BUZZWORD != '' ) { 
          hookPersonalizedSubtitleHTML += 
            "<p style='line-height:0.4;'>" +
              "<span class='h1-sub'>with buzzword :: <strong>" + 
              "<a href='#' style='padding:15px;' onclick=bzHeadlines('" + API_BUZZWORD + "','','','','display-headlines') >" + API_BUZZWORD + "</a></strong></span>" +
              // "<a href='#' style='padding:15px;' onclick=bzPersonalized('','','" + API_BUZZWORD + "','display-buzzwords-personalized') >" + API_BUZZWORD + "</a></strong></span>" +
            "</p>" + '\n' 
        };
        hookPersonalizedSubtitleHTML += "</h2>";
  interfaceDisplay.outerHTML = hookPersonalizedSubtitleHTML;

  //
  // update the refresh button with the values from the dropdown
  let refreshPersonalizedButtonDisplay = document.querySelector("#hook-btn-refreshPersonalized");
  var hookrefreshPersonalizedHTML = "" + 
        "<a href='#' class='btn btn-primary' id='retrieve-resources' onClick=refreshPersonalized('" + API_CHANNEL + "','" + API_CHANNELID + "','" + API_BUZZWORD + "','" + DISPLAYID + "')><span id='refresh-spin' class='glyphicon glyphicon-refresh'></span> Refresh</a>" + '\n' +
        "<br/>" + '\n';
  refreshPersonalizedButtonDisplay.innerHTML = hookrefreshPersonalizedHTML;

}
//////////////////
function getBuzzwordsPersonalized(channel,channelid,buzzword,display) {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today
  var API_CHANNEL = channel;
  var API_CHANNELID = channelid;
  var API_BUZZWORD = buzzword;
  var DISPLAYID = "#" + display;
  
  // curl -s 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=All&day=2019-04-04&page=0' | jq .Items[].buzzword
  // const url = 'https://n64djjt3h1.execute-api.us-east-1.amazonaws.com/getBuzzwords?channel=CNN&day=2019-04-04'; // bz api
  // const url = 'https://v36b2odoc6.execute-api.us-east-1.amazonaws.com/Prod'; // ?channel=CNN&day=2019-04-04'; // bz api
  var url = 'https://getbuzzwords.api.buzzwords.news/Prod?'
     if ( API_CHANNEL != '') {  url += "channel=" + API_CHANNEL };
     if ( API_DAY != '') { url += "&day=" + API_DAY };
     if ( API_BUZZWORD !='') { url += "&buzzword=" + API_BUZZWORD }; 

// ?channel=CNN&day=2019-04-04'; // bz api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>...no results for channel: #" + API_CHANNEL + "</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div class='table-responsive'>" + '\n' +
	"<table class='table table-hover table-striped'>" + '\n' +
	'\t' + "<tbody>";
      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

      for (let i in result.Items) {
        output +=
	  "<tr>" + '\n' + 
	  "<td>" + '\n' +
	  "<div class='buzzword-container'>" + '\n' +
	  "<div class='side-a'>" + '\n' +
          "<strong>buzzword:</strong>" + '\n';

        // Integration Logic :: The Coupling Point
        if (app_type == "d8") {
          output +=
            // pass routing to drupal :: the coupling point
            // DONE: move from progressively decoupled, to fully decoupled, or make it work in both
            // drupal decoupled link, todo: build new link after Personalize page is done
            //<h1><a href="/headlines?buzzword=%5B%5B%3A%3C%3A%5D%5DTrump%5B%5B%3A%3E%3A%5D%5D&amp;channel=66">Trump</a></h1>
	    "<h1><a href='/headlines?buzzword=%5B%5B%3A%3C%3A%5D%5D" + result.Items[i].buzzword + "%5B%5B%3A%3E%3A%5D%5D&amp;channel=" + API_CHANNELID + "'>" + result.Items[i].buzzword + "</a></h1>" + '\n';
        } else {
          output +=
            // bzHeadlines(buzzword,channel,start_date,end_date,display)
	    "<h1><a href='#' onclick=bzHeadlines('" + result.Items[i].buzzword + "','" + API_CHANNEL + "','" + result.Items[i].start_date + "','" + result.Items[i].end_date + "','display-headlines') >" + result.Items[i].buzzword + "</a></h1>" + '\n';
        }

          output +=
	  "<strong>" + result.Items[i].buzzword_day_count + "</strong>"  + " mentions, <br>" + '\n' +
	  "with " + "<strong>" + result.Items[i].pstvity_score_txt + "</strong>" + " sentiment, <br>" + '\n' +
	  "in " + "<strong>" + result.Items[i].buzzword_headline_cnt + " #" + result.Items[i].channel + "</strong>" + " headlines, <br>" + '\n' +
	  "containing " + "<strong>" + result.Items[i].buzzword_wordsread_cnt + "</strong>" + " words, <br>" + '\n' + 
	  "on " + result.Items[i].day + "<br>" + '\n' +
	  "</div>" + '\n' +

	  "<div class='side-b'>" + '\n' +
	  "score:" + '\n' +
	  "<strong>" + result.Items[i].buzzword_score + "</strong><br>" + '\n' +
	  result.Items[i].buzzword_calc_time + '\n' + 
	  // timeSince(result.Items[i].buzzword_calc_time) + '\n' + 
          // time_ago(result.Items[i].buzzword_calc_time - aDay * 2) + '\n' +
          // time_ago(new Date(result.Items[i].buzzword_calc_time - aDay * 2)) + '\n' +
	  "</div><div class='float-clear'></div></div></td></tr>" + '\n' +
	  // "</div></div>" + '\n' +
	  '\n'
      }

      output += "</table>";
      // output += "<br><br>";
      displayResources.innerHTML = output;
    }
  });
};
//////////////////
//////////////////
// ui widget functions
//////////////////
function buildPersonalizedMenu() {

  var API_DAY = today // TODO: make this dynamic with date picker in personalization, for now default to today

  // var API_DAY = day; // TODO: add support for passing day from front end date picker to backend api param as API_DAY, for now, api is defaulting to today
  // var DISPLAYID = "#" + display;
  var DISPLAYID = "#hook-buildPersonalizedMenu";
  
  const url = 'https://bzchannels.api.buzzwords.news/Prod?day=' + API_DAY ; // ?day=2019-04-04'; // bz channels api

  // let displayResources = document.querySelector("#display-resources");
  let displayResources = document.querySelector(DISPLAYID);
//  displayResources.textContent =
//    "Loading data from JSON source...";

      displayResources.innerHTML = "<div class='small-loader'></div>";

  // fetch(url, {mode: 'no-cors'})
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {

    //if results exists, display them, else empty
    // if (result.Items) {
    if (result.Items[0] == null) {
      let displayResourcesEmpty = document.querySelector(DISPLAYID);
      let outputEmpty = "<div><p>calculating...</p></div>"; 
      displayResourcesEmpty.innerHTML = outputEmpty;
    } else {

      // let output = result;
      let output =
        // "<pre style='height: 300px; width: 800px; overflow:scroll;'>";
	"<div id='widget-personalized-channels-dropdown'>" + '\n' +
        "<p>Choose channel ::</p>" + '\n' +
         // refreshPersonalized(API_CHANNEL,API_CHANNELID,API_BUZZWORD,DISPLAYID);
        "<select onChange=refreshPersonalized(this.options[this.selectedIndex].value,'','','display-buzzwords-personalized') onfocus='this.selectedIndex = -1;'>";

      // output += result;
      // DEBUG ::
      // output += JSON.stringify(result);

      for (let i in result.Items) {
        output +=
          // <option value="1">Text 1</option>
          // <option value="2">Text 2</option>
            "<option value='" + result.Items[i].channel + "'>#" + result.Items[i].channel + "</option>" + '\n' +
	  '\n'
      }

      output += "</select><br></div>";
      // output += "</table>";
      // output += "<br><br>";
      displayResources.innerHTML = output;
    }
  });

// fix d8 style of widget
// fixD8styles();
if (app_type == "d8") { document.querySelector('#hook-buildPersonalizedMenu').style.top = '50px' };

}
///////////////////////
//////////////////////
/////////////////////

/************************************************************
******************
****************** bzinit :: last function to bootstrap the application
******************
*************************************************************/
function bzinit() {
/* function to bootstrap any functions on load */
  buildMenuHTML();  // nav
  bzHome();  // home
}


