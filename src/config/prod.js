const redirectUri = 'https://www.bytealien.com/api/user/github/oauth'
const GITHUB_OAUTH = {
  url: `https://github.com/login/oauth/authorize?client_id=42fe2219ab22cd547ceb&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user&state=blog`,
  redirectUri,
  clientid: '42fe2219ab22cd547ceb'
}
export default {
  GITHUB_OAUTH
}
