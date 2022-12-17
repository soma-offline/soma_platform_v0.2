import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/App.css';
import Navbar from './Navbar';
import Subjects from './Subjects';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Papers from './Papers';
import Paper from './Paper';
import Addpaper from './Addpaper';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
        <Route path="/add-kcpe-paper">
            <Addpaper />
          </Route>
          <Route path="/Subjects/:subject">
            <Papers />
          </Route>
        <Route path="/:subject/:paper">
            <Paper />
          </Route>
          <Route exact path="/">
            <Subjects />
          </Route>
          
        </Switch>
    </Router>
    </div>
    </QueryClientProvider>
  );
}



export default App;
