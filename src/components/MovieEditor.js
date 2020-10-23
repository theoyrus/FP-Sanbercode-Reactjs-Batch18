import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../AuthContext'
import { API_URL } from '../Config'
import { MovieContext, MovieProvider } from './MovieContext'
import '../css/movie-editor.css'
import axios from 'axios'

const MovieEditor = () => {
    const history = useHistory()
    const [isLogin,] = useContext(AuthContext)
    if (!isLogin) {
        // tidak boleh jika belum login, lempar ke halaman awal
        history.push('/')
    }
    return (
        <>
            <section>
                <MovieProvider>
                    <MovieList />
                    <MovieForm />
                </MovieProvider>
            </section>
        </>
    )
}



const MovieList = () => {
    const { produkMovieContext, recordMovieContext, alertContext, cariContext, recordKosong } = useContext(MovieContext)
    const [produkMovie, setProdukMovie] = produkMovieContext
    const [, setRecordMovie] = recordMovieContext
    const [isAlert, setAlert] = alertContext
    const [, setKataCari] = cariContext
    const [kataForm, setKataForm] = useState('')

    const handleEdit = (ev) => {
        setRecordMovie(produkMovie[ev.target.value])
    }

    const handleCari = (ev) => {
        let kata = ev.target.value
        setKataForm(kata)
    }

    const handleSearch = (ev) => {
        setKataCari(kataForm)
    }

    const handleDelete = (ev) => {
        let id = ev.target.value
        let movieNama = produkMovie.filter(el => el.id == id)[0]?.title
        console.log(movieNama)
        let isHapus = window.confirm(`Apakah yakin akan menghapus movie ${movieNama}?`)
        if (isHapus) {
            setRecordMovie(recordKosong)
            setAlert('Menghapus data ...')
            axios.delete(`${API_URL}/movies/${id}`)
                .then(res => {
                    setAlert('')
                    setProdukMovie(null)
                })
                .catch(err => {
                    setAlert(`Maaf, kendala koneksi (Err: ${err})`)
                })
        }
    }
    return (
        <>
            <div className="div_tengah w50">
                <h1>Daftar Film</h1>

                {
                    isAlert !== '' && (<div className="alert" >{isAlert}</div>)
                }

                <div className="cari">
                    <input onChange={handleCari} type="text" on name="kata_cari" placeholder="Ketikkan judul film yang akan dicari" />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <table className="tabel-kece">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>Duration</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produkMovie !== null && produkMovie.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.year}</td>
                                        <td>{item.duration} minutes</td>
                                        <td>{item.genre}</td>
                                        <td>{item.rating}</td>
                                        <td className="td_action">
                                            <button className="buttonBlue" value={index} onClick={handleEdit}>Edit</button>
                                            <button className="buttonRed" value={item.id} onClick={handleDelete}>Hapus</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            produkMovie === null && (<div style={{ textAlign: 'center' }}>Belum ada data tersedia ...</div>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

const MovieForm = () => {
    const { produkMovieContext, recordMovieContext, alertContext, recordKosong } = useContext(MovieContext)
    const [, setProdukMovie] = produkMovieContext
    const [recordMovie, setRecordMovie] = recordMovieContext
    const [isAlert, setAlert] = alertContext

    const handleChange = (ev) => {
        let { name, value } = ev.target
        setRecordMovie({ ...recordMovie, [name]: value })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (recordMovie.id === null) {
            // tambah
            setAlert('Menambah data ...')
            axios.post(`${API_URL}/movies`, recordMovie)
                .then(res => {
                    setProdukMovie(null)
                    setRecordMovie(recordKosong)
                })
                .catch(err => {
                    setAlert(`Maaf, kendala koneksi (Err: ${err})`)
                })
        } else {
            // tambah
            setAlert('Memperbaharui data ...')
            axios.put(`${API_URL}/movies/${recordMovie.id}`, recordMovie)
                .then(res => {
                    setProdukMovie(null)
                    setRecordMovie(recordKosong)
                })
                .catch(err => {
                    setAlert(`Maaf, kendala koneksi (Err: ${err})`)
                })
        }
    }

    return (
        <div className="container">
            <h1>Movies Form</h1>
            {
                isAlert !== '' && (<div className="alert" >{isAlert}</div>)
            }
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-25">
                        <label>Title:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.title} type="text" id="title" name="title" placeholder="Movie Title" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Description:</label>
                    </div>
                    <div className="col-75">
                        <textarea onChange={handleChange} value={recordMovie.description} id="description" name="description" placeholder="Movie Description / Synopsis"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Year:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.year} min="1980" type="number" id="year" name="year" placeholder="Release Year (min: 1980)" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Duration:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.duration} type="number" id="duration" name="duration" placeholder="Duration in minutes" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Genre:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.genre} type="text" id="genre" name="genre" placeholder="Genre" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Rating:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.rating} min="0" max="10" type="number" id="rating" name="rating" placeholder="Number 0-10" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label>Image Url:</label>
                    </div>
                    <div className="col-75">
                        <input onChange={handleChange} value={recordMovie.image_url} type="text" id="image_url" name="image_url" placeholder="Image URL" />
                    </div>
                </div>

                <div className="row">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MovieEditor