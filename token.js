$(document).ready(function() { 
    const access_hash = window.location.hash.substr(1).split('&');
    var key = {};
    for (i=0; i<access_hash.length; i++) {
        var tmp = access_hash[i].split('=');
        key[tmp[0]] = tmp[1];
      }
    access_token = key['access_token'];
    localStorage.setItem('access_token', access_token);
    sessionStorage.setItem('access_token', access_token);
    window.location.assign("display.html");
});