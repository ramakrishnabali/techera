import {useNavigate} from 'react-router-dom'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <img
        onClick={() => {
          navigate('/')
        }}
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="websiteLogo"
      />
    </div>
  )
}

export default Header
