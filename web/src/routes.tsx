import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePetPoint from './pages/CreatePetPoint'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />      
      <Route component={CreatePetPoint} path="/create-petpoint"/>      
    </BrowserRouter>
  )
}

export default Routes