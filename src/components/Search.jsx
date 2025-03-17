import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'
import { useStateContext } from '../contexts/StateContextProvider'

const Search = () => {
    const {setSearchTerm} = useStateContext()
    const [text, setText] = useState('')
    const [value, setValue] = useState('')
    // const [debouncedValue] = useDebounce(text, 300)

    useEffect(() => {
        console.log(text)
        if(text){
            setSearchTerm(text)
        }
    }, [text])

    return (
        <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
            <input 
                type="text" 
                value={value}
                className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none px-6 text-black hover:shadow-lg'
                placeholder='Search Google'
                onChange={(e) => setValue(e.target.value)}
            />
            <Link to='/search'>
                <button 
                    type='button'
                    className='top-1 text-2xl right-[-40px] absolute'
                    onClick={() => setText(value)}
                >
                    🔎
                </button>
            </Link>
            {value && (
                <button
                    type='button'
                    className='top-0.5 right-4 text-2xl text-gray-500 absolute'
                    onClick={() => setValue('')}
                >
                    x
                </button>
            )}
            <Links />
        </div>
    )
}

export default Search