// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQC4q7YK6L8nPnhzcW7swGLy31e_O1iZQeieeicEqdduYQLLegwovs8-N4RmaQYG5N1T7RdKZ7Tadb6-muH11di1v4hdHcc-eHgVzhbdTXsjO99YSEBbhVRhXHdvKYC-gPt5_SUE0sJ19mIsjL1QdG4dZIqDk7vYhjd0iLTvwyreo11XFm_YXopPsEZMipLl9SYv9EIfyIRxSJI8NL7f0u4VJ8B9wbBYnTk4KFYAP9pQTEuI9nHuZi16u2vD7MXjRRDzjZZ2pt0';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);