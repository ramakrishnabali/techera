import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Course from './components/Course'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="course/:id" element={<Course />} />
    <Route element={<NotFound />} />
  </Routes>
)

export default App
