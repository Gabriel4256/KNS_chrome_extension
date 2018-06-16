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

    

var html = '<a class="blue-text collection-item" href="' + currentwebsite + '" target="_blank">';
  
  html += '<img src="http://s2.googleusercontent.com/s2/favicons?domain=' + nohttp(baseurl(currentwebsite)) + '"/>';
  html += currentwebsite + '<span class="new badge blue" data-badge-caption="Current Websiste NOW"><span><a/>';
  html += '<div id="stButton"><a class="waves-effect waves-light btn">button</a></div>';
  
  
  

$("div.seolist").html(html);
$('#stButton').on('click', function(){
     console.log(`currentwebsite: ${currentwebsite}`);
     
     /*chrome.pageCapture.saveAsMHTML({tabId: tab.id}, function(mhtmlData){
        var url = window.webkitURL.createObjectURL(mhtmlData);
        chrome.downloads.download({url: url, filename: tab.title + '.mht'})
        //window.open(url);
     });*/
     chrome.tabs.executeScript(null, {file: "js/jquery.min.js"}, function(){
       chrome.tabs.executeScript({file : 'getContent.js'})
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
    


