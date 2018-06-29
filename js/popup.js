$(document).ready(function(){
    
// Use Chrome extension open new window
/*$('#seolist').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
});*/

//if (!location.origin)
  //location.origin = location.protocol + "//" + location.host;
    
    //var currenturl = window.location.toString();
    
    //var currenturl = tabs[0].url;
//chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//    var currenturl = tabs[0].url;
//});
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    console.log(tab.url);
    //alert(tab.url);
    //var newurl = nohttp(tab.url);
    var currentwebsite= tab.url;

//var newurl = location.origin.replace(/.*?:\/\//g, "");
//var newurl = location.origin.replace(/^https?\:\/\//i, "");

    

var html =`
            <div class="row">
              <div class="col s1"><img src="http://s2.googleusercontent.com/s2/favicons?domain=${nohttp(baseurl(currentwebsite))}"/></div>
              <div class="col s11 flow-text truncate">${currentwebsite}</div>
            </div>
            <div class="row">
              <div class="col s4" id="stButton"><a class="waves-effect waves-light btn">Get article</a></div>
              <div class="col s4" id="removeAds"><a class="waves-effect waves-light btn">Remove Ads</a></div>
              <div class="col s4" id="minimized"><a class="waves-effect waves-light btn">Minimize</a></div>
            </div>
          `
  
  // html += '<div class = row><img src="http://s2.googleusercontent.com/s2/favicons?domain=' + nohttp(baseurl(currentwebsite)) + '"/>';
  // html += `<div class="col s6">${currentwebsite}</div></div>`;
  // html += '<div class="row">'
  // html += '<div class="col s4" id="stButton"><a class="waves-effect waves-light btn">Get article</a></div>';
  // html += '<div class="col s4" id="removeAds"><a class="waves-effect waves-light btn">Remove Ads</a></div>';
  // html += '<div class="col s4" id="minimized"><a class="waves-effect waves-light btn">Minimize</a></div>';
  // html +='</div>'
  

$("div.seolist").html(html);
//$("div.tab2").html(html2);
$('#removeAds').on('click', function(){
  chrome.tabs.executeScript({file: 'js/removeAds.js'})
})
$('#stButton').on('click', function(){
     console.log(`currentwebsite: ${currentwebsite}`);
     
     /*chrome.pageCapture.saveAsMHTML({tabId: tab.id}, function(mhtmlData){
        var url = window.webkitURL.createObjectURL(mhtmlData);
        chrome.downloads.download({url: url, filename: tab.title + '.mht'})
        //window.open(url);
     });*/
     chrome.tabs.executeScript(null, {file: "js/jquery.min.js"}, function(){
       chrome.tabs.executeScript({file : 'js/getContent.js'})
     })


     return false;
});
    
}); // chrome tab end

/************************/
// MATERIALIZE CSS

  $(".dropdown-button").dropdown();
  $('ul.tabs').tabs();
  
}); // Doc ready end

function baseurl(url) {
  var domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  //find & remove port number
  domain = domain.split(':')[0];

  return domain;
}
//console.log(baseurl(url));

/************************/
function nohttp(url) {
  //var protomatch = /^(https?|ftp):\/\//; // NB: not '.*'
  //return url.replace(/^https?\:\/\//i, "");
  //return url.replace(/.*?:\/\//g, "");
  url = url.replace("www.", "");
  return url.replace(/.*?:\/\//g, "");
  //return url.replace((http|https):\/\)?;
}
    


