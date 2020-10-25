import React, { useContext, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Main from './layout/Main'
import Movies from './components/Movies'
import MovieDetail from './components/MovieDetail'
import Games from './components/Games'
import GameDetail from './components/GameDetail'
import MovieList from './components/MovieList'
import MovieForm from './components/MovieEditor'
import GameList from './components/GameList'
import GameForm from './components/GameEditor'
import Login from './components/Login'
import Profile from './components/Profile'

const Routes = () => {
    const [auth, setAuth] = useContext(AuthContext)
    let isLogin = (auth !== null && auth !== '' && auth.hasOwnProperty('token')) ? true : false

    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Main>
                        <Route exact path="/"><Redirect to="/movies" /></Route>
                        <Route path="/movies"><Movies /></Route>
                        <Route path="/movie/:id/:title"><MovieDetail /></Route>
                        <Route exact path="/games"><Games /></Route>
                        <Route path="/game/:id/:name"><GameDetail /></Route>
                        <PrivateRoute exact path="/manage-movie" isAuth={isLogin}>
                            <MovieList />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-movie/edit/:id" isAuth={isLogin}>
                            <MovieForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-movie/add" isAuth={isLogin}>
                            <MovieForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-game" isAuth={isLogin}>
                            <GameList />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-game/edit/:id" isAuth={isLogin}>
                            <GameForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-game/add" isAuth={isLogin}>
                            <GameForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile" isAuth={isLogin}>
                            <Profile />
                        </PrivateRoute>
                        <Route path="/login"><Login /></Route>
                    </Main>
                </Route>
            </Switch>
        </Router>

    )
}

const PrivateRoute = ({ children, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default Routes