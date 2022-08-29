import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import { Switch } from 'react-router';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
