import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.sass';
import Location from './Pages/Location';
import FaceCheck from './Pages/FaceCheck';
import FaceAdd from './Pages/FaceAdd';
import PersonSetting from './Pages/Entry/PersonSetting';
import Leave from './Pages/Leave/PersonSetting';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path='/' component={Location} />
          <Route path='/camera-test' component={Location} >
            <Redirect to="/" />
          </Route>
          <Route path='/Location' component={Location} />
          <Route path='/FaceCheck' component={FaceCheck} />
          <Route path='/Leave' component={Leave} />
          <Route path='/FaceAdd' component={FaceAdd} />
          <Route path='/Entry/PersonSetting' component={PersonSetting} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
