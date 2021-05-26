const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    document.querySelector('#tracks').innerHTML = null;
    fetch(baseURL + '?type=track&' + 'q=' + term)
    .then(response => response.json())
    .then(data => {
        var track_template_html = null;
        if (data.length == 0){
            console.log("No tracks found that match your search criteria");
            document.querySelector('#tracks').innerHTML = '<p> No tracks found </p>';
        }else if (data.length < 5){
            for (var i = 0; i < data.length; i++){
                //console.log(data[i]);
                var prev_url = data[i].preview_url;
                var track_img_url = data[i].album.image_url;
                var track_name = data[i].name;
                var artist_name = data[i].artist.name;
                track_template_html = '<section class="track-item preview" data-preview-track=' + prev_url + '>' +
                                    '<img src=' + track_img_url + '>' +
                                    '<i class="fas play-track fa-play" aria-hidden="true"></i>' + 
                                    '<div class="label">' +
                                        '<h3>' + track_name + '</h3>' +
                                        '<p>' + artist_name + '</p>' +
                                    '</div>' +
                                '</section>';
                document.querySelector('#tracks').innerHTML += track_template_html;
            }
        }else {
            for (var i = 0; i < 5; i++){
                //console.log(data[i]);
                var prev_url = data[i].preview_url;
                //console.log(typeof prev_url); //string
                var track_img_url = data[i].album.image_url;
                var track_name = data[i].name;
                var artist_name = data[i].artist.name;
                track_template_html = '<section class="track-item preview" data-preview-track=' + prev_url + ' ' + 'onclick="playTrackBack(' + prev_url + ')"' + '>' +
                                    '<img src=' + track_img_url + '>' +
                                    '<i class="fas play-track fa-play" aria-hidden="true"></i>' + 
                                    '<div class="label">' +
                                        '<h3>' + track_name + '</h3>' +
                                        '<p>' + artist_name + '</p>' +
                                    '</div>' +
                                '</section>';
                console.log(track_template_html);
                document.querySelector('#tracks').innerHTML += track_template_html;
            }
        }
        
        /*
        const curr_track_to_play = document.querySelector('.track-item preview');
        console.log(curr_track_to_play);
        curr_track_to_play.onkeyup = (ev) => {
            console.log(ev.keyCode);
            var prev_url = curr_track_to_play.data-preview-track;
            audioPlayer.setAudioFile(prev_url);
        }*/
        
        
    })

    /*
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);*/
};

const getAlbums = (term) => {
    document.querySelector('#albums').innerHTML = null;
    fetch(baseURL + '?type=album&' + 'q=' + term)
    .then(response => response.json())
    .then(data => {
        var album_template_html = null;
        if (data.length == 0){
            console.log("No albums found")
            document.querySelector('#albums').innerHTML = '<p> No albums found </p>';
        }
        for (var i = 0; i < data.length; i++){
            //console.log(data[i]);
            var album_id = data[i].id;
            var img_url = data[i].image_url;
            var album_name = data[i].name;
            var spot_url = data[i].spotify_url;
            album_template_html = '<section class="album-card" id=' + album_id + '>' +
                                    '<div>' +
                                        '<img src =' + img_url + '>' +
                                        '<h3>' + album_name + '</h3>' +
                                        '<div class="footer">' +
                                            '<a href=' + spot_url + 'target="_blank">view on spotify</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</section>';
            document.querySelector('#albums').innerHTML += album_template_html;
        }
    })

    /*
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);*/
};

const getArtist = (term) => {
    document.querySelector('#artist').innerHTML = null;
    fetch(baseURL + '?q=' + term + '&type=artist')
    .then(response => response.json())
    .then(data => {
        //console.log(data[0]);
        if (data.length == 0){
            console.log("No artists found");
            document.querySelector('#artist').innerHTML = '<p> No artists found </p>';
        }
        var curr_artist = data[0];
        var artist_name = curr_artist.name;
        var artist_id = curr_artist.id;
        var image_url = curr_artist.image_url;
        //console.log(image_url)
        var spot_url = curr_artist.spotify_url;
        var artist_template_html = '<section class="artist-card" id=' + artist_id + '>' +
                                        '<div>' +
                                            '<img src =' + image_url + '>' +
                                            '<h3>' + artist_name + '</h3>' +
                                            '<div class="footer">' +
                                                '<a href=' + spot_url + 'target="_blank">view on spotify</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</section>';
        //console.log(artist_template_html);
        document.querySelector('#artist').innerHTML += artist_template_html;
    })
    
    /*
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);*/
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    //console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};


function playTrackBack (previewURL){
    var track_player_item = document.querySelector(".track-item");
    
    audioPlayer.setAudioFile(previewURL);
    audioPlayer.play();
}