import React, { useState } from "react"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Router from "./components/Router"

function App() {
  const [darkTheme, setDarkTheme] = useState( false )

  return (
    <div className={darkTheme ? 'dark' : ''}>
        <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 min-h-screen">
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Router />
          {/* <Test /> */}
          <Footer />
        </div>
    </div>
  )
}

export default App
