import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/StateContextProvider'

const links = [
    { url: '/search', text: '🔎 All' },
    { url: '/news', text: '📰 News' },
    { url: '/images', text: '📸 Images' },
    { url: '/videos', text: '📺 Videos' },
]
const Links = () => {
    const {searchTerm} = useStateContext()
    const navigate = useNavigate()

    const handleClick = (e) => {
        if(!searchTerm.trim()){
            e.preventDefault()
            navigate('/')
        }
    } 
    
    return (
        <div className='flex items-center justify-between mt-4 sm:justify-around'>
            {links.map(({url, text}) => (
                <NavLink
                    key={url}
                    to={url}
                    onClick={handleClick}
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-md transition duration-300 ${
                            isActive
                                ? 'text-blue-700 border-b-2 border-blue-700 pb-2 dark:text-blue-300'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                        }${!searchTerm.trim() ? " cursor-not-allowed" : ""}`
                    }
                >
                    {text}
                </NavLink>
            ))}
        </div>
    )
}

export default Links