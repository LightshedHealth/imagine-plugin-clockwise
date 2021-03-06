var webPage = require('webpage'),
    system = require('system'),
    base64 = require('/src/helpers/base64');

var page = webPage.create(),
    resource = system.args[1],
    fileName = system.args[2],
    width = system.args[3] || 1920,
    height = system.args[4] || 1080,
    pageLoadWait = system.args[5] || 30000;

page.viewportSize = {width: width, height: height };

var onReady = function(){
  setTimeout(function() {
    page.render(fileName);
    phantom.exit();
  }, pageLoadWait);
};

callbackFn = function(data){
  if (data && data.renderNow) {
    page.render(fileName);
    phantom.exit();
  };
};

openFn = function (status){
  window.setTimeout(function(){
    phantom.exit(1);
  }, pageLoadWait);
};

page.onNavigationRequested = function(url, type, willNavigate, main) {
  if (url.match(/app.periscopedata.com.shared.+embed=v2/) && !url.match('screenshot=true')){
    url += '&screenshot=true';
    page.onCallback = callbackFn;
    page.open(url, openFn);
  }
};

page.onCallback = callbackFn;
page.open(base64.decode(resource), openFn);
