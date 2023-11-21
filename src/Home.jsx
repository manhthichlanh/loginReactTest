import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'

function Home() {


  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  }
  const openLoginOAuthPopup = (platform) => {
    const width = 500;
    const height = 600;
    // Calculate the center position
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open('http://localhost:3000/popup/oauth?platform=' + platform, "_blank", `width=${width},height=${height},left=${left},top=${top}`);

    // Trong trang hiện tại (cửa sổ cha)
    const handlePostMessage = (event) => {
      console.log(event)
      // Kiểm tra origin để đảm bảo an toàn (tuỳ thuộc vào yêu cầu của ứng dụng bạn)
      if (event.origin === window.origin) {
        const data = event.data;

        // Kiểm tra loại dữ liệu
        if (data.type === 'authentication') {
          const authorizationCode = data.data;

          // Gửi mã code lên server để lấy token và thông tin người dùng
          // Thực hiện các xử lý tại đây

          console.log('Received authorization code:', authorizationCode);
        }
      }
    };

    // Thêm lắng nghe sự kiện để nhận dữ liệu từ cửa sổ con
    window.addEventListener('message', handlePostMessage);
    // Add the rest of your code (event listener, etc.) here
  };
  return (
    <>
      <div>
        <div>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </div>
        <div>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </div>
      </div>
      <h1>OAuth Google</h1>
      <div>
        {isAuthenticated ? (
          <div>
            <p>Xin chào, bạn đã login thành công</p>
            <button onClick={logout}>Click để logout</button>
          </div>
        ) : (
          <>
            <button onClick={() => {
              openLoginOAuthPopup('google')
            }}>Login with Google</button>
            < button onClick={() => { openLoginOAuthPopup('facebook') }}>Login with Facebook</button>
          </>
          // <Link to={oauthURL}>Login with Google</Link>
          // <button onClick={handleLogin}>Login</button>

        )}
      </div >
    </>
  )
}

export default Home;
