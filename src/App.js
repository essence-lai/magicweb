import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CardDetails from './components/card/CardDetails';
import SignIn from './components/auth/SignIn';
//import SignUp from './components/auth/SignUp';
import CreateCard from './components/card/CreateCard';
import CreateDeck from './components/deck/CreateDeck';
import DeckDashboard from './components/deck/DeckDashboard';
import DeckDetails from './components/deck/DeckDetails';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/card/:id' component={CardDetails}/>
                <Route path='/signin' component={SignIn}/>
                {/*<Route path='/signup' component={SignUp}/>*/}
                <Route path='/createcard' component={CreateCard}/>
                <Route path='/createdeck' component={CreateDeck}/>
                <Route path='/decks' component={DeckDashboard}/>
                <Route path='/deck/:id' component={DeckDetails}/>
            </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
