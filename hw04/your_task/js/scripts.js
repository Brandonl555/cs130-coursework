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
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    fetch(baseURL + '?q=' + term + '&type=artist')
    .then(response => response.json())
    .then(data => {
        console.log(data[0]);
        var artist_name = data.name;
        /*
        const artist_template_html = '
            <section class="artist-card" id="3Nrfpe0tUJi4K4DXYWgMUX">
                <div>
                    <img src = data.image_url>
                    <h3>artist_name</h3>
                    <div class="footer">
                        <a href="https://open.spotify.com/artist/3Nrfpe0tUJi4K4DXYWgMUX" target="_blank">
                            view on spotify
                        </a>
                </div>
            </div>
            </section>';*/
        //document.querySelector('#artist-section').innerHTML += artist_template_html;
    })
    
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};