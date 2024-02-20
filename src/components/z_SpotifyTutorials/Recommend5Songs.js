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

const topTracksIds = [
  '7wjmwD5nIYWVnHiR3X3PTO','6RuJ0WNSn2PQu8U7wypipa','2qqc9SJrU5yQkQlpnenZ4R','4HKm29c0GNhY2fLh1Kcm9J','4DKIRVMWLSNWmjoyjsf4qW'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);