import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import rootSaga from './sagas'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import UserPage from './pages/User'
import MainPage from './pages/Main'
import UserBarContainer from './containers/UserBarContainer'
import SyncModalContainer from './containers/SyncModalContainer'
import user from './reducers/user'
import cards from './reducers/cards'
import queue from './reducers/queue'
import modal from './reducers/modal'
import connection from './reducers/connection'
import { createStore, applyMiddleware } from 'redux'
import PrivateRoute from './components/common/PrivateRoute'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './styles/app.css'
import {ADMIN_ACCESS_LEVEL} from "./constants/access"
import Card from './pages/Card'
import NewCard from './pages/NewCard'

const reducer = combineReducers({
    user,
    queue,
    connection,
    modal,
    cards
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);

/**
 * 404 component for wrong query
 */
const WrongRoute = props => <h1 className='alert-danger p-3 rounded'>Wrong url, dude!</h1>

/**
 * 403 component for forbidden route
 */
const Forbidden = props => <h1 className='alert-warning p-3 rounded'>You're not supposed to be here, sorry, dude :(</h1>

const App = React.memo(props => {
    return <div>
        <Provider store={store}>
            <div className='app mx-auto'>
                <Router>
                    <div>
                        <UserBarContainer />
                        <Switch>
                            <PrivateRoute path="/" exact component={MainPage} />
                            <PrivateRoute path="/cards/new" exact requiredAccessLevel={ADMIN_ACCESS_LEVEL} component={NewCard} />
                            <PrivateRoute path="/cards/:id" requiredAccessLevel={ADMIN_ACCESS_LEVEL}  component={Card} />
                            <PrivateRoute path="/users/:id" component={UserPage} />
                            <PrivateRoute path="/forbidden" component={Forbidden} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/login" component={LoginPage} />
                            <Route component={WrongRoute} />
                        </Switch>
                        <SyncModalContainer />
                    </div>
                </Router>
            </div>
        </Provider>
    </div>
})

export default App