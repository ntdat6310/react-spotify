export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
export const redirect_uri = 'https://ntdat-react-spotify.vercel.app/login'

export async function redirectToSpotifyAuthCodeFlow() {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)
  localStorage.setItem('verifier', verifier)

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('response_type', 'code')
  params.append('redirect_uri', redirect_uri)
  params.append(
    'scope',
    'user-read-private user-read-email, user-library-read, user-library-modify, user-read-playback-state, user-modify-playback-state, user-read-currently-playing, app-remote-control, streaming, playlist-read-private, playlist-read-collaborative, playlist-modify-private, playlist-modify-public, user-follow-modify, user-follow-read, user-read-playback-position, user-top-read, user-read-recently-played'
  )
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`
}

function generateCodeVerifier(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
