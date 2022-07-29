import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import PinList from './components/PinList';
import PinManage from './components/PinManage';
import SignUp from './components/SignUp';

export default function App() {
  const [countries, setCountries] = useState([])
  const [user, setUser] = useState([])
  const [world, setWorld] = useState([])
  const [notify, setNotify] = useState("")
  const [action, setAction] = useState("")

  useEffect(() => {
    if (!countries.length) {
      fetch("http://localhost:4000/countries")
        .then(resp => resp.json())
        .then(data => setCountries(data))
      
      fetch("http://localhost:4000/user")
        .then(resp => resp.json())
        .then(data => setUser(data))
      
      fetch("http://localhost:4000/world")
        .then(resp => resp.json())
        .then(data => setWorld(data))
    }
  }, [countries])

  const setNotification = (country, verb) => {
    setNotify(country)
    setAction(verb)
    setTimeout(() => setNotify(""), 3000)
  }

  return (
    <Router>
      <header style={{height: "125px"}}>
        <h1>🌎Scratch Match</h1>
        <div className='nav-bar'>
          <Link to="/map">Scratch Map</Link>
          {" "}
          <Link to="/manage">Manage Pins</Link>
          {" "}
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className='notify'>
          {notify && <p>{notify} was {action}!</p>}
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path='/signup'
            element={<SignUp
              user={user}
              setUser={setUser}
            />}
          />
          <Route
            path='/map'
            element={
              <PinList
                user={user}
                countries={countries}
              />
            }
          />
          <Route
            path='/manage'
            element={
              <PinManage
                countries={countries}
                setCountries={setCountries}
                world={world}
                setNotification={setNotification}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

