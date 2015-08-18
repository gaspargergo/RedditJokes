/*
---------
Variables
---------
*/

var list;
var sorting = "/new"
var colorArray = ["#F44336","#9C27B0","#2196F3","#009688","#607D8B","#4CAF50"];
var sortingArray = ["/hot","/new"];
var limitArray = [25,50,10];
var nsfwFilter = true;
var shortnessFilter = false;
var postLimit = 10;

/*
---------------------------
Functions loading the jokes
---------------------------
*/
var loadData = function() {
  var urlToLoad = "";
  if(postLimit <= 10) {
    urlToLoad = "https://www.reddit.com/r/jokes" + sorting + ".json";
  }
  else {
    urlToLoad = "https://www.reddit.com/r/jokes" + sorting + ".json" + "?limit=" + (postLimit+ 25);
  }

  var request = new XMLHttpRequest();
  request.open('GET',urlToLoad, true);

  request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    var json = JSON.parse(this.response);
    list = json.data.children;
    listPosts(list);
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  prompt("Connection error");
};

request.send();
}

loadData(); //The first call - when loading the website.

var addPosts = function(listing){ //Adds post to a string that will be added to the body
  var jokes = 0;
  var result = "";
  var textLimit = 111111111;

  if(shortnessFilter === true) {
    textLimit = 600;
  }

  for(var i = 0; jokes < postLimit; i++) {
    var obj = listing[i].data;
    
    var title = obj.title;
    var exturl = obj.url;
    var text = obj.selftext;

    if(text.length < textLimit) {
      if(nsfwFilter === true) {
        if(obj.over_18 === false) {
          var temp = result;
             
          result = temp + "<div class='animated fadeIn'>" + "<h1>" + title + "</h1>" + "<p>" + text + "</p>" + "</div>";
          jokes += 1;
        }
      }
      else {
        var temp = result;
             
        result = temp + "<div class='animated fadeIn'>" + "<h1>" + title + "</h1>" + "<p>" + text + "</p>" + "</div>";
        jokes += 1;
      }
    }
  }

  return result;
}

var listPosts = function(listing) { //Adds the string to the body
  var result = addPosts(listing);
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

  listPosts(list);
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

  listPosts(list);
}

var i = 0; //The var to cycle through colors
var changeColor = function() {
  document.getElementById("header").style.backgroundColor = colorArray[i];
  document.getElementById("header_menu").style.backgroundColor = colorArray[i];
  if(i === colorArray.length-1) {
    i = 0;
  }
  else {
    i += 1;
  }
}

var j = 0; //The var to cycle through limit numbers
var changePostLimit = function() {
  postLimit = limitArray[j];
  document.getElementById("PostLimitChangeA").innerHTML = "Post limit: " + postLimit;
  if(j === limitArray.length-1) {
    j = 0;
  }
  else {
    j += 1;
  }

  loadData();
}
