import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { API_URL } from '../Config'

export const MovieContext = createContext()

export const recordKosong = {
    id: null,
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
    // review: null,
    image_url: ""
}
export const MovieProvider = (props) => {
    const [produkMovie, setProdukMovie] = useState(null)
    const [recordMovie, setRecordMovie] = useState(recordKosong)
    const [isAlert, setAlert] = useState(false)
    const [kataCari, setKataCari] = useState(null)

    useEffect(() => {
        if (produkMovie === null) {
            movieLoad();
        }
        if (kataCari !== null) {
            movieSearch(kataCari)
        }
    }, [produkMovie, kataCari])

    const movieSearch = (kata) => {
        let hasil = produkMovie
        console.log('kata yg dicari', kataCari)
        if (kataCari !== '') {
            hasil = produkMovie.filter((oby) => {
                return oby.title.toLowerCase().includes(kataCari.toLowerCase())
            })
            setProdukMovie(hasil)
        } else {
            console.log('get ulang')
            setProdukMovie(null) //get ulang
        }
        setKataCari(null)
    }

    const movieLoad = () => {
        axios.get(`${API_URL}/movies`)
            .then(res => {
                let dataMovie = res.data
                let hasil = dataMovie
                // if (kataCari !== '') {
                //     hasil = produkMovie.filter((oby) => {
                //         return oby.title.toLowerCase().includes(kataCari.toLowerCase())
                //     })
                // }
                setProdukMovie(hasil)
                setAlert('')
                console.log('executed movieLoad')
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <MovieContext.Provider value={{
            produkMovieContext: [produkMovie, setProdukMovie],
            recordMovieContext: [recordMovie, setRecordMovie],
            alertContext: [isAlert, setAlert],
            cariContext: [kataCari, setKataCari],
            recordKosong
        }}>
            {props.children}
        </MovieContext.Provider>
    )
}