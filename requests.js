var trackIDs = [];
var trackNames = [];
var artistNames = [];
var trackURIs = [];
var albumObjs = [];
var albumArts = [];

var albumObjString = "";
var trackIDString = "";

var trackDance = [];
var trackEnergy = [];
var trackMood = [];
var trackTempo = [];

var artistImg = [];

var counter = 0;

var relaxy = [];
var party = [];
var cheery = [];
var mellow = [];
var angry = [];

var length;

var oneMonthFlag = 0;
var sixMonthFlag = 0;
var allTimeFlag = 0;

var access_token;

var deferredArr = [];

var customCount = 0;

var mellowuri = "";
var cheeryuri = "";
var energeticuri = "";
var relaxyuri = "";
var partyuri = "";
var customuri = "";

var mellowcounter = 0;
var cheerycounter = 0;
var energeticcounter = 0;
var relaxycounter = 0;
var partycounter = 0;

var tabSelectedName = "";
//----------------------------------------------------------------------

$(document).ready(function () {
  access_token = localStorage.getItem("access_token");
  oneMonthRequest();
});

function sixMonthsRequest() {
  setSixMonthsActive();
  resetEverything();
  $.ajax({
    url: "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      length = response.total;
      counter = response.total;
      getTrackIDs(response);
    },
  });
}

function allTimeRequest() {
  setAllTimeActive();
  resetEverything();
  $.ajax({
    url: "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      length = response.total;
      counter = response.total;
      getTrackIDs(response);
    },
  });
}

function oneMonthRequest() {
  resetEverything();
  setOneMonthActive();
  $.ajax({
    url: "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      length = response.total;
      counter = response.total;
      getTrackIDs(response);
    },
  });
}

function resetEverything() {
  mellowuri = "";
  cheeryuri = "";
  energeticuri = "";
  relaxyuri = "";
  partyuri = "";
  customuri = "";

  playlistName = "";

  albumObjString = "";
  trackIDString = "";

  mellowcounter = 0;
  cheerycounter = 0;
  energeticcounter = 0;
  relaxycounter = 0;
  partycounter = 0;

  trackIDs = [];
  trackNames = [];
  artistNames = [];
  trackURIs = [];
  albumObjs = [];
  albumArts = [];

  trackDance = [];
  trackEnergy = [];
  trackMood = [];
  trackTempo = [];

  artistImg = [];

  counter = 0;

  relaxy = [];
  party = [];
  cheery = [];
  mellow = [];
  angry = [];

  length = 0;

  deferredArr = [];

  customCount = 0;

  oneMonthFlag = 0;
  sixMonthFlag = 0;
  allTimeFlag = 0;

  resetDOMs();
}

function resetDOMs() {
  $("#mellow-empty-state").removeClass("hide");
  $("#cheery-empty-state").removeClass("hide");
  $("#energetic-empty-state").removeClass("hide");
  $("#relaxy-empty-state").removeClass("hide");
  $("#party-empty-state").removeClass("hide");
  $("#custom-button").removeClass("show");

  $("#track-list-custom").children(":not(#custom-empty-state)").remove();
  $("#custom-empty-state").addClass("empty-state");
  $("#track-list-mellow").children(":not(#mellow-empty-state)").remove();
  $("#mellow-empty-state").addClass("empty-state");
  $("#track-list-cheery").children(":not(#cheery-empty-state)").remove();
  $("#cheery-empty-state").addClass("empty-state");
  $("#track-list-energetic")
    .children(":not(#energetic-empty-state)")
    .remove();
  $("#energetic-empty-state").addClass("empty-state");
  $("#track-list-relaxy").children(":not(#relaxy-empty-state)").remove();
  $("#relaxy-empty-state").addClass("empty-state");
  $("#track-list-party").children(":not(#party-empty-state)").remove();
  $("#party-empty-state").addClass("empty-state");
}

function getTrackIDs(musicList) {
  for (i = 0; i < length; i++) {
    trackIDs[i] = musicList.items[i].id;
    trackIDString += String(musicList.items[i].id);
    trackIDString += ",";
    trackNames[i] = musicList.items[i].name;
    artistNames[i] = musicList.items[i].artists[0].name;
    trackURIs[i] = musicList.items[i].uri;
    albumObjs[i] = musicList.items[i].album.id;
    albumObjString += String(musicList.items[i].album.id);
    albumObjString += ",";
  }
  requestTrackInfo();
}

function getAlbumArt() {
  var str1 = albumObjString.split(",");
  var str2 = "";
  var str3 = "";
  var str4 = "";
  var albumCounter = 0;
  for (i = 0; i < length; i++) {
    if (i < 20) {
      str2 += str1[i];
      str2 += ",";
    }
    if (i >= 20 && i < 40) {
      str3 += str1[i];
      str3 += ",";
    }
    if (i >= 40 && i < length) {
      str4 += str1[i];
      str4 += ",";
    }
  }
  str2 = str2.replace(/,\s*$/, "");
  str3 = str3.replace(/,\s*$/, "");
  str4 = str4.replace(/,\s*$/, "");

  $.when(getAlbumArt1(str2), getAlbumArt2(str3), getAlbumArt3(str4)).done(
    function (a1, a2, a3) {
      storeImages(a1, a2, a3);
    }
  );
}

function getAlbumArt1(str) {
  return $.ajax({
    url: "https://api.spotify.com/v1/albums?ids=" + encodeURIComponent(str),
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

function getAlbumArt2(str) {
  return $.ajax({
    url: "https://api.spotify.com/v1/albums?ids=" + encodeURIComponent(str),
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

function getAlbumArt3(str) {
  return $.ajax({
    url: "https://api.spotify.com/v1/albums?ids=" + encodeURIComponent(str),
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });
}

function storeImages(response1, response2, response3) {
  for (index = 0; index < length; index++) {
    if (index < 20) {
      albumArts[index] = response1[0].albums[index].images[0].url;
    }
    if (index >= 20 && index < 40) {
      albumArts[index] = response2[0].albums[index - 20].images[0].url;
    }
    if (index >= 40 && index < length) {
      albumArts[index] = response3[0].albums[index - 40].images[0].url;
    }
    console.log(albumArts[index]);
  }

  calculateCategory();
}

function requestTrackInfo() {
  $.ajax({
    url:
      "https://api.spotify.com/v1/audio-features?ids=" +
      encodeURIComponent(trackIDString),
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      setTrackInfo(response);
    },
  });
}

function setTrackInfo(track) {
  for (i = 0; i < length; i++) {
    trackDance[i] = track.audio_features[i].danceability;
    trackEnergy[i] = track.audio_features[i].energy;
    trackMood[i] = track.audio_features[i].valence;
    trackTempo[i] = track.audio_features[i].tempo;
  }
  getAlbumArt();
}

function calculateCategory() {
  var c;

  for (c = 0; c < length; c++) {
    if (trackMood[c] < 0.3 && trackEnergy[c] < 0.6) {
      addToMellow(c);
      mellowuri += String(trackURIs[c]);
      mellowuri += ",";
    }
    if (trackMood[c] > 0.6 && trackEnergy[c] > 0.3) {
      addToCheery(c);
      cheeryuri += String(trackURIs[c]);
      cheeryuri += ",";
    }
    if (trackEnergy[c] > 0.8) {
      addToEnergetic(c);
      energeticuri += String(trackURIs[c]);
      energeticuri += ",";
    }
    if (trackMood[c] > 0.3 && trackDance[c] > 0.75) {
      addToParty(c);
      partyuri += String(trackURIs[c]);
      partyuri += ",";
    }
    if (trackEnergy[c] < 0.4 && trackMood[c] > 0.3) {
      addToRelaxy(c);
      relaxyuri += String(trackURIs[c]);
      relaxyuri += ",";
    }
  }
}

function getCustomTracks() {
  hideCustomButton();
  var moodVal = document.getElementById("mood-slider").value;
  moodVal = moodVal / 100;
  var danceVal = document.getElementById("dance-slider").value;
  danceVal = danceVal / 100;
  var energyVal = document.getElementById("energy-slider").value;
  energyVal = energyVal / 100;

  customCount = 0;
  emptyCustomList();

  for (i = 0; i < length; i++) {
    if (
      trackMood[i] <= moodVal + 0.25 &&
      trackMood[i] >= moodVal - 0.25 &&
      trackDance[i] <= danceVal + 0.25 &&
      trackDance[i] >= danceVal - 0.25 &&
      trackEnergy[i] <= energyVal + 0.25 &&
      trackMood[i] >= energyVal - 0.25
    ) {
      customuri += String(trackURIs[i]);
      customuri += ",";
      addToCustom(i);
      customCount++;
    }

    if (i == length - 1 && customCount == 0) {
      showEmptyMessage();
    }
  }
}

function emptyCustomList() {
  const myNode = document.getElementById("track-list-custom");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

// function showEmptyMessage() {
//   var referenceNode = document.querySelector("#track-list-custom");
//   var newNode = document.createElement("div");
//   newNode.className = "empty-state";

//   newNode.innerHTML = "No songs found for this mood. Try another.";

//   referenceNode.appendChild(newNode);
// }

// function addToCustom(i) {
//   var referenceNode = document.querySelector("#track-list-custom");

//   var imgNode = document.createElement("div");
//   imgNode.className = "album-art";

//   var album_img = document.createElement("img");
//   album_img.src = albumArts[i];

//   imgNode.appendChild(album_img);

//   var trackNode = document.createElement("div");
//   trackNode.className = "track";

//   var newNode = document.createElement("div");
//   newNode.className = "track-description";

//   var trackname = document.createElement("div");
//   trackname.innerHTML = trackNames[i];
//   trackname.className = "track-name";

//   var artistname = document.createElement("div");
//   artistname.innerHTML = artistNames[i];
//   artistname.className = "artist-name";

//   newNode.appendChild(trackname);
//   newNode.appendChild(artistname);

//   trackNode.appendChild(imgNode);
//   trackNode.appendChild(newNode);

//   referenceNode.appendChild(trackNode);

//   showCustomButton();
// }

function addToMellow(c) {
  var referenceNode = document.querySelector("#track-list-mellow");

  var imgNode = document.createElement("div");
  imgNode.className = "album-art";

  var album_img = document.createElement("img");
  album_img.src = albumArts[c];

  imgNode.appendChild(album_img);

  var trackNode = document.createElement("div");
  trackNode.className = "track";

  var newNode = document.createElement("div");
  newNode.className = "track-description";

  var trackname = document.createElement("div");
  trackname.innerHTML = trackNames[c];
  trackname.className = "track-name";

  var artistname = document.createElement("div");
  artistname.innerHTML = artistNames[c];
  artistname.className = "artist-name";

  newNode.appendChild(trackname);
  newNode.appendChild(artistname);

  trackNode.appendChild(imgNode);
  trackNode.appendChild(newNode);

  referenceNode.appendChild(trackNode);

  hideMellowEmptyState();
}

function addToCheery(i) {
  var referenceNode = document.querySelector("#track-list-cheery");

  var imgNode = document.createElement("div");
  imgNode.className = "album-art";

  var album_img = document.createElement("img");
  album_img.src = albumArts[i];

  imgNode.appendChild(album_img);

  var trackNode = document.createElement("div");
  trackNode.className = "track";

  var newNode = document.createElement("div");
  newNode.className = "track-description";

  var trackname = document.createElement("div");
  trackname.innerHTML = trackNames[i];
  trackname.className = "track-name";

  var artistname = document.createElement("div");
  artistname.innerHTML = artistNames[i];
  artistname.className = "artist-name";

  newNode.appendChild(trackname);
  newNode.appendChild(artistname);

  trackNode.appendChild(imgNode);
  trackNode.appendChild(newNode);

  referenceNode.appendChild(trackNode);

  hideCheeryEmptyState();
}

function addToParty(i) {
  var referenceNode = document.querySelector("#track-list-party");

  var imgNode = document.createElement("div");
  imgNode.className = "album-art";

  var album_img = document.createElement("img");
  album_img.src = albumArts[i];

  imgNode.appendChild(album_img);

  var trackNode = document.createElement("div");
  trackNode.className = "track";

  var newNode = document.createElement("div");
  newNode.className = "track-description";

  var trackname = document.createElement("div");
  trackname.innerHTML = trackNames[i];
  trackname.className = "track-name";

  var artistname = document.createElement("div");
  artistname.innerHTML = artistNames[i];
  artistname.className = "artist-name";

  newNode.appendChild(trackname);
  newNode.appendChild(artistname);

  trackNode.appendChild(imgNode);
  trackNode.appendChild(newNode);

  referenceNode.appendChild(trackNode);

  hidePartyEmptyStates();
}

function addToRelaxy(i) {
  var referenceNode = document.querySelector("#track-list-relaxy");

  var imgNode = document.createElement("div");
  imgNode.className = "album-art";

  var album_img = document.createElement("img");
  album_img.src = albumArts[i];

  imgNode.appendChild(album_img);

  var trackNode = document.createElement("div");
  trackNode.className = "track";

  var newNode = document.createElement("div");
  newNode.className = "track-description";

  var trackname = document.createElement("div");
  trackname.innerHTML = trackNames[i];
  trackname.className = "track-name";

  var artistname = document.createElement("div");
  artistname.innerHTML = artistNames[i];
  artistname.className = "artist-name";

  newNode.appendChild(trackname);
  newNode.appendChild(artistname);

  trackNode.appendChild(imgNode);
  trackNode.appendChild(newNode);

  referenceNode.appendChild(trackNode);

  hideRelaxyEmptyStates();
}

function addToEnergetic(i) {
  var referenceNode = document.querySelector("#track-list-energetic");

  var imgNode = document.createElement("div");
  imgNode.className = "album-art";

  var album_img = document.createElement("img");
  album_img.src = albumArts[i];

  imgNode.appendChild(album_img);

  var trackNode = document.createElement("div");
  trackNode.className = "track";

  var newNode = document.createElement("div");
  newNode.className = "track-description";

  var trackname = document.createElement("div");
  trackname.innerHTML = trackNames[i];
  trackname.className = "track-name";

  var artistname = document.createElement("div");
  artistname.innerHTML = artistNames[i];
  artistname.className = "artist-name";

  newNode.appendChild(trackname);
  newNode.appendChild(artistname);

  trackNode.appendChild(imgNode);
  trackNode.appendChild(newNode);

  referenceNode.appendChild(trackNode);

  hideEnergeticEmptyState();
}

// ---------------------------------------------------------------------

function getuserIDCustom() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistCustom(response);
    },
  });
}

function getuserIDMellow() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistMellow(response);
    },
  });
}

function getuserIDCheery() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistCheery(response);
    },
  });
}

function getuserIDEnergetic() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistEnergetic(response);
    },
  });
}

function getuserIDRelaxy() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistRelaxy(response);
    },
  });
}

function getuserIDParty() {
  $.ajax({
    url: "https://api.spotify.com/v1/me/",
    headers: {
      Authorization: "Bearer " + access_token,
    },
    success: function (response) {
      createPlaylistParty(response);
    },
  });
}

// ---------------------------------------------------------------------

function createPlaylistCustom(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name:
        "top custom tracks | " +
        String(tabSelectedName) +
        " | moooodify | " +
        String(date),
      description: "Tracks that suit your mood, generated on moooodify.com",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      addCustomTracks(result);
    },
    error: function () {
      console.log("Error! :(");
    },
  });
}

function createPlaylistMellow(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name: "Mooodify- Mellow - " + String(tabSelectedName),
      description: "Your favourite mellow tracks, from Mooodify.",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      addMellowTracks(result);
    }
  });
}

function createPlaylistCheery(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name: "Mooodify- Cheery - " + String(tabSelectedName),
      description: "Your favourite cheery tracks, from Mooodify.",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      addCheeryTracks(result);
    }
  });
}

function createPlaylistEnergetic(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name: "Mooodify- Energetic - " + String(tabSelectedName),
      description:
        "Your favourite high octane tracks, from Mooodify.",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      addEnergeticTracks(result);
    }
  });
}

function createPlaylistRelaxy(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name: "Mooodify- Relaxy - " + String(tabSelectedName),
      description:
        "Your favourite tracks to relax , from Mooodify.",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      addRelaxyTracks(result);
    }
  });
}

function createPlaylistParty(user) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/users/" +
      encodeURIComponent(user.id) +
      "/playlists",
    data: JSON.stringify({
      name:
        "Mooodify- Partayy - " +
        String(tabSelectedName),
      description:
        "Dance the night away to these tracks, from Mooodify.",
    }),
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      addPartyTracks(result);
    }
  });
}

//-----------------------------------------------------------------------

function addMellowTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      mellowuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

function addCustomTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      customuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

function addCheeryTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      cheeryuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

function addEnergeticTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      energeticuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

function addRelaxyTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      relaxyuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

function addPartyTracks(playlist) {
  $.ajax({
    type: "POST",
    url:
      "https://api.spotify.com/v1/playlists/" +
      encodeURIComponent(playlist.id) +
      "/tracks?uris=" +
      partyuri,
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    success: function (result) {
      console.log("Woo! :)");
      showSnackbar();
    }
  });
}

// ---------------------------------------------------------------------

function showSnackbar() {
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function showCustomEmptyState() {
  var x = document.getElementById("custom-empty-state");
  x.className = "show";
}

function showCustomButton() {
  var x = document.getElementById("custom-button");
  x.className = "show";
}

function hideCustomButton() {
  $("#custom-button").removeClass("show");
}

function hideMellowEmptyState() {
  var x = document.getElementById("mellow-empty-state");
  x.className = "hide";
}

function hideCheeryEmptyState() {
  var x = document.getElementById("cheery-empty-state");
  x.className = "hide";
}

function hideEnergeticEmptyState() {
  var x = document.getElementById("energetic-empty-state");
  x.className = "hide";
}

function hideRelaxyEmptyStates() {
  var x = document.getElementById("relaxy-empty-state");
  x.className = "hide";
}

function hidePartyEmptyStates() {
  var x = document.getElementById("party-empty-state");
  x.className = "hide";
}

function setOneMonthActive() {
  oneMonthFlag = 1;
  tabSelectedName = "last month";
  $("#one-month-tab").addClass("active");
  $("#six-months-tab").removeClass("active");
  $("#all-time-tab").removeClass("active");
}

function setSixMonthsActive() {
  sixMonthFlag = 1;
  tabSelectedName = "last 6 months";
  $("#one-month-tab").removeClass("active");
  $("#six-months-tab").addClass("active");
  $("#all-time-tab").removeClass("active");
}

function setAllTimeActive() {
  allTimeFlag = 1;
  tabSelectedName = "all time";
  $("#one-month-tab").removeClass("active");
  $("#six-months-tab").removeClass("active");
  $("#all-time-tab").addClass("active");
}

//------------------------------------------------------------------------------------