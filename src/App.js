import './App.css';
import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import MyPlaylists from './components/MyPlaylists/MyPlaylists';
import UserBadge from './components/UserBadge/UserBadge';
import Spotify from './util/Spotify';
import spotifyLogo from './assets/Spotify_Logo_RGB_White.png';

function App() {
  const [user, setUser] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [targetPlaylistName, setTargetPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistsList, setplaylistsList] = useState([]);

  const userLogged = useCallback(() => {
    Spotify.login()
      .then(setUser)
      .then(Spotify.getPlaylistsList)
      .then(setplaylistsList);
  }, []);

  const search = useCallback((term) => {
    Spotify.search(term)
      .then(setSearchResults)
      .then(userLogged);
  }, [userLogged]);

  const handleNameChange = (e) => {
    return setTargetPlaylistName(e.target.value);
  }

  function addToPlaylist(track) {
    if (!playlistTracks.includes(track)) {
      setPlaylistTracks((prev) => [...prev, track]);
    }
  }

  function removeFromPlaylist(track) {
    setPlaylistTracks((prev) => prev.filter((tr) => tr.id !== track.id));
  }

  const savePlaylist = () => {
    const playlistUris = playlistTracks.map(track => track.uri);
    let existingPlaylist = playlistsList.find((playlist) => playlist.name === targetPlaylistName);
    Spotify.savePlaylist(targetPlaylistName, playlistUris, existingPlaylist ? existingPlaylist.id : null).then((response) => {
      if (response.ok) {
        window.alert(`${targetPlaylistName} saved succesfully to Spotify`);
      }
      setTargetPlaylistName('New Playlist');
      setPlaylistTracks([])
    });
  }

  const selectTargetPlaylist = async (e) => {
//    console.log(e.target.innerText);
    const targetPlaylist = playlistsList.find((playlist) => playlist.name === e.target.innerText);
    const fetchTracks = await Spotify.getPlaylistTracks(targetPlaylist.id)
    setTargetPlaylistName(targetPlaylist.name);
    setPlaylistTracks(fetchTracks);
//    console.log(targetPlaylist.id);
  }

  return (
    <div className="App">
      <header className="App-header">
        <UserBadge user={user} logged={userLogged} />
        <h1>Ja<span className="Highlight">mmm</span>ing</h1>
        <h4>for <span><img className="Spotify-logo" src={spotifyLogo} alt="Spotify logo"></img></span></h4>
        {!user.id && <div className="login-message">(Log in to Spotify to load your playlists)</div>}
      </header>
      <main className="App-body">
        <SearchBar onSearch={search} />
        <div className="Lists-area">
          <MyPlaylists playlistsList={playlistsList} selectTargetPlaylist={selectTargetPlaylist} />
          <SearchResults searchResults={searchResults} addToPlaylist={addToPlaylist} />
          <Playlist
            playlistName={targetPlaylistName}
            playlistTracks={playlistTracks}
            onNameChange={handleNameChange}
            removeFromPlaylist={removeFromPlaylist}
            onSave={savePlaylist}
          />
        </div>
      </main>
      <footer>
        <span className="Highlight">Developed by - </span>
        <span>Douglas Narcizo | 2024</span>
      </footer>
    </div>
  );
}

export default App;
