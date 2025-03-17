import React, {createContext, useContext, useState } from 'react'
import ModalYoutube from '../components/ModalYoutube'

const StateContext = createContext()
const baseUrl = 'https://google-search-master.p.rapidapi.com'

export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [videoKey, setVideoKey] = useState('')

    const getResults = async (url) => {
        setLoading(true)
        console.log(`${baseUrl}${url}`)
        try {
            const res = await fetch(`${baseUrl}${url}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': import.meta.env.VITE_X_RAPIT_API_KEY,
                    'x-rapidapi-host': 'google-search-master.p.rapidapi.com'
                }
            })
    
            const data = await res.json()
            setResults(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false)
        }
    }

    return (
        <StateContext.Provider value={{ setModalIsOpen, setVideoKey, getResults, results, searchTerm, setSearchTerm, loading }}>
            {children}
            <ModalYoutube isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} videoId={videoKey}></ModalYoutube>
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
