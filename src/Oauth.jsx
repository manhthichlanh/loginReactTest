
import { useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';

const getOauthGoogleUrl = (href) => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_AUTHORIZED_REDIRECT_URI } =
    import.meta.env
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: VITE_GOOGLE_AUTHORIZED_REDIRECT_URI,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: href, // Replace with your own state value

  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}
const getOauthFacebookUrl = (href) => {
  const { VITE_FACEBOOK_CLIENT_ID, VITE_FACEBOOK_AUTHORIZED_REDIRECT_URI } =
    import.meta.env
  const rootUrl = 'https://www.facebook.com/v13.0/dialog/oauth'
  const options = {
    client_id: VITE_FACEBOOK_CLIENT_ID,
    redirect_uri: VITE_FACEBOOK_AUTHORIZED_REDIRECT_URI,
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
    state: href
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

export default function Oauth() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform")
  // const navigate = useNavigate();
  const manual_token = searchParams.get('manual_token')
  useEffect(() => {
    const { href, search } = window.location;
    const hrefWithoutSearch = href.replace(search,"")
    console.log(hrefWithoutSearch)
    const authenticatedUserData = { manual_token };
    if (manual_token != null) {
      console.log(window.origin)
      window.opener.postMessage({ type: 'authentication', data: authenticatedUserData }, window.origin);
      window.close();
    } else {
      const test = platform == 'google' && getOauthGoogleUrl(hrefWithoutSearch) || platform == 'facebook' && getOauthFacebookUrl(hrefWithoutSearch)
      window.location.href = test;
    }
  }, []
  )
  return (
    <>
      <Link to={getOauthGoogleUrl()}>TTT</Link>
      <h1>Login Process</h1>
    </>
  )
}

