const redirectUri = 'http://127.0.0.1:8087/api/user/github/oauth'
const GITHUB_OAUTH = {
  url: `https://github.com/login/oauth/authorize?client_id=21f4188b819898fac2d1&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user&state=blog`,
  redirectUri,
  clientid: '21f4188b819898fac2d1'
}
export default {
  GITHUB_OAUTH
}
