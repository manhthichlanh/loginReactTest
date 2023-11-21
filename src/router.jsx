import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Oauth from './Oauth'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login/oauth',
    element: <Login />
  },
  {
    path: '/popup/oauth',
    element: <Oauth/>
  }
])

export default router
