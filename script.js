/*
---------
Variables
---------
*/

var list = [];
var sorting = "/new"
var colorArray = ["#F44336","#9C27B0","#2196F3","#009688","#607D8B","#4CAF50"];
var sortingArray = ["/hot","/new"];
var nsfwFilter = true;
var shortnessFilter = false;
var firstLoad = true;
var lastID;

/*
---------------------------
Functions loading the jokes
---------------------------
*/
var loadData = function() {
  var urlToLoad = "";
  if(firstLoad === true) {
    urlToLoad = "https://www.reddit.com/r/jokes" + sorting + ".json" + "?limit=25";
    firstLoad = false;
  }
  else {
    urlToLoad = "https://www.reddit.com/r/jokes" + sorting + ".json" + "?count=25&after=" + lastID;
  }

  var request = new XMLHttpRequest();
  request.open('GET',urlToLoad, true);

  request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    var json = JSON.parse(this.response);
    for(var i = 0; i < json.data.children.length; i++){
      list.push(json.data.children[i]);
    }
    listPosts();
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  prompt("Connection error");
};

request.send();
}

var addPosts = function(){ //Adds post to a string that will be added to the body
  var result = "";
  var textLimit = 111111111;

  if(shortnessFilter === true) {
    textLimit = 600;
  }

  for(var i = 0; i < list.length; i++) {
    var obj = list[i].data;
    
    var title = obj.title;
    var exturl = obj.url;
    var text = obj.selftext;

    if(text.length < textLimit) {
      if(nsfwFilter === true) {
        if(obj.over_18 === false) {    
          result += "<div class='animated fadeIn'>" + "<h1>" + "<a href=" + '"' + exturl + '">' + title + "</a>" + "</h1>" + "<p>" + text + "</p>" + "</div>";
        }
      }
      else {
        result += "<div class='animated fadeIn'>" + "<h1>" + "<a href=" + '"' + exturl + '">' + title + "</a>" + "</h1>" + "<p>" + text + "</p>" + "</div>";
      }
    }
  }
  lastID = list[list.length-1].data.name;
  result += "<div id='loadMoreBtn' onclick='loadData()'>Load more</div>";

  return result;
}

var listPosts = function() { //Adds the string to the body
  var result = addPosts();
  document.getElementById("content").innerHTML = result;
}

/*
-----------------------------------
Functions of the options/menu items
-----------------------------------
*/

var k = 0; //the var to cycle through different sorts
var changeSorting = function() {
  sorting = sortingArray[k];
  document.getElementById("sortingChangeA").innerHTML = "r/jokes" + sorting;

  if(k === sortingArray.length-1) {
    k = 0;
  }
  else {
    k += 1;
  }

  loadData();
}

var changeSFilter = function() {
  if(shortnessFilter == false) {
    shortnessFilter = true;
    document.getElementById("sLimitChangeA").innerHTML = "Shortness filter on";
  }
  else {
    shortnessFilter = false;
    document.getElementById("sLimitChangeA").innerHTML = "Shortness filter off";
  }

  listPosts();
}

var changeNSFWFilter = function() {
  if(nsfwFilter === false) {
    nsfwFilter = true;
    document.getElementById("NSFWChangeA").innerHTML = "NSFW filter on";
  }
  else {
    nsfwFilter = false;
    document.getElementById("NSFWChangeA").innerHTML = "NSFW filter off";
  }

  listPosts();
}

var i = 0; //The var to cycle through colors
var changeColor = function() {
  document.getElementById("header").style.backgroundColor = colorArray[i];
  document.getElementById("header_menu").style.backgroundColor = colorArray[i];
  document.getElementById("loadMoreBtn").style.backgroundColor = colorArray[i];
  if(i === colorArray.length-1) {
    i = 0;
  }
  else {
    i += 1;
  }
}
/*
-------------------------
Functions to call on load
-------------------------
*/
loadData();