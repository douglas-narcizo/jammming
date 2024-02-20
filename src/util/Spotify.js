const clientId = '16ff87b2bca54429b064b03cfa1af213'; // Insert client ID here.
const redirectUri = 'https://dougs-jammming.netlify.app/callback'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public,user-modify-playback-state&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  login() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
//      console.log(jsonResponse);
      return {
        display_name: jsonResponse.display_name,
        id: jsonResponse.id,
        images: jsonResponse.images
      };
    });
  },

  getPlaylistsList() {
    const accessToken = Spotify.getAccessToken();
    return fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
//      console.log(jsonResponse);
      return jsonResponse.items;
    });
  },

  getPlaylistTracks(id) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?fields=items(track(id,name,artists,album,uri,image,preview_url))`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
//      console.log(jsonResponse.items.map(item => item.track.uri).join());
      return jsonResponse.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
        image: item.track.album.images[0].url,
        preview_url: item.track.preview_url
      }));
    });
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
        preview_url: track.preview_url
    }));
    });
  },

  savePlaylist(name, trackUris, playlistId) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    if (playlistId) {
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { headers: headers,
          method: 'PUT',
          body: JSON.stringify({uris: trackUris})
        }
      )
    } else {
      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          });
        });
      });
    }
  }
};

export default Spotify;