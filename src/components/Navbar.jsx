import React from 'react'
import  { Link } from 'react-router-dom'
import Search from './Search'

const Navbar = ({darkTheme, setDarkTheme}) => {
  return (
    <div className="p-5 pb-0 flex flex-wrap justify-center items-center border-b border-gray-200 dark:border-gray-700 sm:justify-between">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-50 dark:text-gray-900">
            Google 🔎
          </p>
        </Link>
        <button 
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-lg dark:bg-gray-400 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg"
        >
          {darkTheme ? '💡 Light' : '🌙 Dark'}
        </button>
      </div>
      <Search />
    </div>
  )
}

export default Navbar