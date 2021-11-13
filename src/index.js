import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import App from './App';
import ViewingPage from './ViewingPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={()=>(<App />)}></Route>
        <Route path="/viewing/" render={()=>(<ViewingPage />)}></Route>
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
