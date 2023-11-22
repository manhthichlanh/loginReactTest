import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const manual_token = searchParams.get('manual_token')
    localStorage.setItem('manual_token', manual_token)
    navigate('/')
  }, [searchParams, navigate])

  return <div>Login</div>
}
