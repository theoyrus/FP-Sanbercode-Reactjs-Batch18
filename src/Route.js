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

const Routes = () => {
    const { AppAuthContext } = useContext(AuthContext)
    const [isAuth, setAuth] = useState(AppAuthContext)

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
                        <PrivateRoute exact path="/manage-movie" isAuth>
                            <MovieList />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-movie/edit/:id" isAuth>
                            <MovieForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-movie/add" isAuth>
                            <MovieForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-game" isAuth>
                            <GameList />
                        </PrivateRoute>
                        <PrivateRoute path="/manage-game/edit/:id" isAuth>
                            <GameForm />
                        </PrivateRoute>
                        <PrivateRoute exact path="/manage-game/add" isAuth>
                            <GameForm />
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