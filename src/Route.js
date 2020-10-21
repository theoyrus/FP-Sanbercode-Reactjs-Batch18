import React, { useContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Main from './layout/Main'
import About from './components/About'
import Home from './components/Home'
import MovieEditor from './components/MovieEditor'
import Login from './components/Login'

const Routes = () => {
    const { AppAuthContext } = useContext(AuthContext)
    const [isAuth, setAuth] = useState(AppAuthContext)
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Main>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/about"><About /></Route>
                        <Route path="/movie-editor"><MovieEditor/> </Route>
                        <Route path="/login"><Login /></Route>
                    </Main>
                </Route>
            </Switch>
        </Router>

    )
}

export default Routes