
import { useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';

const getOauthGoogleUrl = () => {
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
    ].join(' ')
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}
const getOauthFacebookUrl = () => {
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
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

export default function Oauth() {
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform")
  // const navigate = useNavigate();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");
  useEffect(() => {
    console.log({ access_token, refresh_token })
    const authenticatedUserData = { access_token, refresh_token };
    if (access_token != null) {
      console.log(window.origin)
      window.opener.postMessage({ type: 'authentication', data: authenticatedUserData }, window.origin);
      window.close();
    } else {
      const test = platform == 'google' && getOauthGoogleUrl() || platform == 'facebook' && getOauthFacebookUrl()
      window.location.href = test;
    }
  }, []
  )
  // useEffect(() => {
  //   // if (access_token==null) {
  //   //   navigate(getOauthGoogleUrl(),)
  //   // }
  //   console.log(window.opener)

  //   if (access_token != null && refresh_token != null) {
  //     console.log({ access_token, refresh_token })
  //     console.log(window.opener)
  //   }
  //   // const authenticatedUserData = { access_token, refresh_token };

  //   // Gửi dữ liệu từ cửa sổ con đến cửa sổ cha
  //   // setTimeout(() => {
  //   //   window.opener.postMessage({ type: 'authentication', data: authenticatedUserData }, window.origin);

  //   // },500
  //   // )
  //   // console.log(window.opener)
  //   // Đóng cửa sổ con  
  //   // window.close();
  // }, [access_token, refresh_token])
  return (
    <>
      <Link to={getOauthGoogleUrl()}>TTT</Link>
      <h1>Login Process</h1>
    </>
  )
}

