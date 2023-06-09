import express from "express";
import fetch from "node-fetch";

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

const redirect_uri = "http://localhost:3000/callback";
const client_id = "911713b87b594f46ab106d0861db2255";
const client_secret = "9b468ed1bc8a4bb2bdd20bd42d47429e";

global.access_token;

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: "user-library-read",
    redirect_uri: redirect_uri,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  app.get("/playlists", async (req, res) => {
    const playlists = await getData("/me/playlists");
  
    res.render("playlists", { playlists: playlists.items });
  });

  app.get('/playlist_info', async (req, res) => {
    const playlistId = req.query.id;
    const playlist_name = req.query.name;
    const playlistTracks = await getData(`/playlists/${playlistId}/tracks`);
  
    res.render("playlist_info", { playlist_name: playlist_name, playlistTracks: playlistTracks.items });
  });
  
  
  
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("/dashboard");
});

async function getData(endpoint) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();
  return data;
}

app.get("/dashboard", async (req, res) => {
  const userInfo = await getData("/me");
  const tracks = await getData("/me/tracks?limit=50");

  res.render("dashboard", { user: userInfo, tracks: tracks.items });
});

app.get("/search", async (req, res) => {
  const query = req.query.query;
  const searchResults = await getData("/search?type=track&q=" + query);

  res.render("search_results", { query: query, results: searchResults.tracks.items });
});


app.get("/recommendations", async (req, res) => {
  const artist_id = req.query.artist;
  const track_id = req.query.track;
  const track_name = req.query.name;
  const track_artist = req.query.artist;

  const params = new URLSearchParams({
    seed_artist: artist_id,
    seed_genres: "rock",
    seed_tracks: track_id,
  });

  const data = await getData("/recommendations?" + params);
  res.render("recommendation", { 
    track_artist: track_artist, 
    track_name: track_name, 
    tracks: data.tracks,
    artist_name: track_artist, 
    song_name: track_name 
  });
});


let listener = app.listen(3000, function () {
  console.log(
    "Your app is listening on http://localhost:" + listener.address().port
  );
});