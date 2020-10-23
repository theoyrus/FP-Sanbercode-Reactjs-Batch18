import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <section>
            <div style={{ border: "1px solid grey", padding: "5px" }}>
                <h1 align="center">Data Peserta Sanbercode Bootcamp Reactjs</h1>
                <ol>
                    <li><b>Nama:</b> Suryo Prasetyo W</li>
                    <li><b>Email:</b> the.oyrus@gmail.com</li>
                    <li><b>Sistem Operasi yang digunakan:</b> Linux Mint</li>
                    <li><b>Akun Github: </b><a target="_blank" href="https://github.com/theoyrus">https://github.com/theoyrus</a></li>
                    <li><b>Akun Telegram:</b> theoyrus (Suryo Prasetyo W)</li>
                </ol>
            </div>
            <Link to="/">Kembali Ke Index</Link>
        </section>
    )
}

export default About