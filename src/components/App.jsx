import React from "react";
import { Route, HashRouter } from "react-router-dom";
import Main from "./Main";
import Gate from "./Gate";
import Chatroom from "./Chatroom";
import bg from '../assets/bg.png'

function App() {
    return (
        <article className="main" style={{'backgroundImage': `url(${bg})`}}>
            <HashRouter>
                <Route exact path="/" render={() =><Main />}></Route>
                <Route path="/choose/:name/:id/:pt" render={({match}) =><Gate params={match.params}/>}></Route>
                <Route path="/room/:name/:id/:pt" render={({match}) =><Chatroom params={match.params} />}></Route>
            </HashRouter>
        </article>
    )
}

export default App;
