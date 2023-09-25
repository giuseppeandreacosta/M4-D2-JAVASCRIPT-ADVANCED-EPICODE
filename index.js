function search() {
    const searchField = document.getElementById('searchField');
    const artist = searchField.value.toLowerCase();
    
    if (artist === 'queen' || artist === 'metallica' || artist === 'eminem') {
        
        fetchSongData(artist);
    }
}

function fetchSongData(artist) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore di rete!');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('results');
        container.innerHTML = ''; // Pulisce i risultati precedenti
        data.data.forEach(song => {
            const songElement = document.createElement('div');
            songElement.innerHTML = /*html*/
            `      
            <div class="card-body">
            <img src="${song.album.cover}" class="card-img-top" alt="Cover dell'album">
                <h5 class="card-title mt-2">${song.title}</h5>
                <p class="card-text mt-1">Album: ${song.album.title}</p>
                <p class="card-text mt-1">Durata: ${song.duration} secondi</p>
            </div>
    
        `
            ;
            container.appendChild(songElement);
        });
        document.getElementById('searchResults').classList.remove('d-none');
        document.getElementById('section').classList.remove('d-none'); // Mostra la sezione eminem,queen.metallica
        document.getElementById('section').querySelector('h2').textContent = artist;
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}
 

