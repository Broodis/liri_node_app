// dotenv & package requires
require("dotenv").config();
var Twitter = require("twitter");

// keys
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

// arg input variables
var command = process.argv[2];
var choice = process.argv[3];

// functions

function twitterStuff() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: " ",
        count: 20
    };
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            for (var i = 1; i <= 20; i++) {

            }
            console.log(tweets);
        }
        else {
            console.log(error);
        }
    });
}
function spotifyStuff() {
    spotify.search({ type: "track", query: choice }, function (error, data) {
        if (!error) {
            displaySpotify(data);
        }
        else if (error) {
            console.log(error);
        }
    });
}

function spotifyStuff() {
    if (choice === undefined) {
        spotify.search({ type: "track", query: "The Sign Ace of Base" }, function (error, data) {
            if (!error) {
                displaySpotify(data);
            }
            else {
                throw error;
            }
        });
    }
    else if (choice !== undefined) {
        spotify.search({ type: "track", query: choice }, function (error, data) {
            if (!error) {
                displaySpotify(data);
            }
            else {
                throw error;
            }
        });
    
    }
}