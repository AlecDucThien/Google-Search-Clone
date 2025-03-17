import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'

import Results from './Results'
import Home from './Home'

const Router = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Results />} />
        <Route path="/news" element={<Results />} />
        <Route path="/images" element={<Results />} />
        <Route path="/videos" element={<Results />} />
      </Routes>
    </div>
  )
}

export default Router