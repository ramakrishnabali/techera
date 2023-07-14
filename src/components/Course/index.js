import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

const Course = () => {
  const {id} = useParams()
  const [course, setCourse] = useState()
  const [status, setApi] = useState(apiStatus.loading)

  const getCourse = async () => {
    const api = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)

    if (response.ok) {
      const data = await response.json()
      const updatedCourse = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      setCourse(updatedCourse)
      setApi(apiStatus.success)
    } else {
      setApi(apiStatus.failure)
    }
  }

  useEffect(() => {
    getCourse()
  }, [])

  const loadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const failureView = () => (
    <div className="product-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page your are looking for.</p>
      <button type="button" onClick={() => getCourse()}>
        Retry
      </button>
    </div>
  )

  const successPage = () => {
    const {name, description, imageUrl} = course

    return (
      <div className="course-container">
        <img src={imageUrl} alt={name} />
        <div className="course-details">
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

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
export default Course
