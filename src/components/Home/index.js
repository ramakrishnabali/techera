import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

const Home = () => {
  const [skills, setSkills] = useState()

  const [status, setApi] = useState(apiStatus.loading)

  const getSkills = async () => {
    const api = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      setSkills(updatedData)
      setApi(apiStatus.success)
    } else {
      setApi(apiStatus.failure)
    }
  }

  useEffect(() => {
    getSkills()
  }, [])

  const loadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const successPage = () => (
    <>
      <h1 className="main-heading">Courses</h1>
      <ul className="skills-container">
        {skills.map(skill => {
          const {id, name, logoUrl} = skill
          return (
            <Link to={`course/${id}`} className="link">
              <li key={id} className="list">
                <img src={logoUrl} alt={name} className="image" />
                <p className="name">{name}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </>
  )

  const failureView = () => (
    <div className="product-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page your are looking for.</p>
      <button type="button" onClick={() => getSkills()}>
        Retry
      </button>
    </div>
  )

  const displaySkills = () => {
    switch (status) {
      case apiStatus.loading:
        return loadingView()
      case apiStatus.success:
        return successPage()
      case apiStatus.failure:
        return failureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {displaySkills()}
    </>
  )
}

export default Home
