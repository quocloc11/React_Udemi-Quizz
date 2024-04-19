import videoHomepage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomePage = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source
          src={videoHomepage}
          type="video/mp4" />

      </video>
      <div className='homepage-content'>
        <div className='title-1'>
          Make forms
          worth filling out
        </div>
        <div className='title-2'>
          Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different.
        </div>
        <div className='title-3'>
          {isAuthenticated === false ?
            <button onClick={() => navigate('/login')}>Get's started. It's free</button>
            :
            <button onClick={() => navigate('/users')}>
              Doing Quiz Now
            </button>
          }

        </div>
      </div>
    </div>

  )
}
export default HomePage