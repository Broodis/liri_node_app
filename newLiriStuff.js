// load keys.js file
var keys = require('./keys.js');

// node processes
var command = process.argv[2];
var choice = process.argv[3];

// twitter function (my-tweets)
var myTweets = function () {
    // require twitter module
    var Twitter = require('twitter');
    // export keys from keys.js file
    var client = new Twitter(keys.twitter);
    // set necessary twitter api parameters 
    var params = {
        screen_name: 'JayRP12',
        count: 20
    };
    // 'get' request to Twitter
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        // error check
        if (error) {
            console.log("Error!" + error);
            // else show twitter data
        } else {
            console.log("Here are 20 of your latest tweets \n");
            for (var i = 0; i < tweets.length; i++) {
                console.log((i + 1) + tweets[i].text);
            }
        }
    });

}

// spotify function (spotify-this-song)
var spotifyThisSong = function (trackChoice) {
    // require spotify module
    var spotify = require('spotify');
    // default song choice if user does not choose
    if (trackChoice === undefined) {
        trackChoice = "The Sign Ace of Base";
    }
    // request to spotify api
    spotify.search({ type: "track", query: choice }, function (error, data) {
        // error check
        if (error) {
            console.log("Error!" + error);
            // else show spotify data
        } else {
            console.log('Track: ' + data.tracks.item[1].name);
            console.log('Album ' + data.tracks.items[0].album.name);
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Preview: ' + data.tracks.items[0].preview_url);
        }
    });
}

// ombd function (movie-this)
var movieThis = function (movieChoice) {
    // require request module
    var request = require("request");
    // default movie choice if user does not choose
    if (movieChoice === undefined) {
        movieChoice = "mr. nobody";
    }
    // request to ombd
    request("http://www.omdbapi.com/?t=" + movieChoice + "&y=&plot=short&r=json", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("* Title of the movie:         " + JSON.parse(body).Title);
            console.log("* Year the movie came out:    " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
            console.log("* Country produced:           " + JSON.parse(body).Country);
            console.log("* Language of the movie:      " + JSON.parse(body).Language);
            console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
            console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
        }
    });
}

// input functionality 
if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    spotifyThisSong(query);
} else if (command === "movie-this") {
    movieThis(query);
} else if (command === undefined) {
    console.log("Please enter one of LIRI's recognized commands.")
} else {
    console.log("Try using a different command...")
}