import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext()
export const AuthProvider = (props) => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        console.log('Status login', auth)
        if (auth === null) {
            setAuth(false)
            if (localStorage.getItem('authData') !== null) {
                setAuth(localStorage.getItem('authData'))
            }
        }
        console.log('Status login', auth)
    }, [auth])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}