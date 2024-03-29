import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import Profile from './components/Profile';
import PinList from './components/PinList';
import PinManage from './components/PinManage';
import SignUp from './components/SignUp';
import Country from './components/Country';
import Hero from './components/Hero';
import Friends from './components/Friends';
import FriendList from './components/FriendList';
import SuggestedFriends from './components/SuggestedFriends';
import FriendProfile from './components/FriendProfile';

export default function App() {
  const [countries, setCountries] = useState([])
  const [user, setUser] = useState([])
  const [world, setWorld] = useState([])
  const [people, setPeople] = useState([])
  const [friends, setFriends] = useState([])
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
      
      fetch("http://localhost:4000/people")
        .then(resp => resp.json())
        .then(data => setPeople(data))
      
      fetch("http://localhost:4000/friends")
        .then(resp => resp.json())
        .then(data => setFriends(data))
    }
  }, [countries])

  const setNotification = (country, verb) => {
    setNotify(country)
    setAction(verb)
    setTimeout(() => setNotify(""), 3000)
  }

  return (
    <Router>
      <header>
        <div>
          <h1>🌎Scratch Match</h1>
          <div className='nav-bar'>
            {user.firstName !== "" && <Link to="/map">Scratch Map</Link>}
            {" "}
            {user.firstName !== "" && <Link to="/manage">Manage Pins</Link>}
            {" "}
            {user.firstName === "" && <Link to="/signup">Sign Up</Link>}
            {user.firstName !== "" && <Link to="/profile">Profile</Link>}
            {user.firstName !== "" && <Link to="/friends">Friends</Link>}
          </div>
          <div className='notify'>
            {notify && <p className='notification'>{notify} was {action}!</p>}
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          {user.firstName === "" &&
            <Route
              path='/signup'
              element={
                <SignUp
                  user={user}
                  setUser={setUser}
              />}
            />}
          {user.firstName !== "" &&
            <Route
              path='/profile'
              element={
                <Profile
                  user={user}
                  setUser={setUser}
                  countries={countries}
                  friends={friends}
                />
              }
            />}
          {user.firstName !== "" &&
            <Route
              path='/map'
              element={
                <PinList
                  user={user}
                  countries={countries}
                  friends={friends}
                />
              }
            />}
          {user.firstName !== "" &&
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
            />}
          {user.firstName !== "" &&
            <Route path='/friends' element={<Friends />}>
              <Route
                path='list'
                element={
                  <FriendList
                    friends={friends}
                    countries={countries}
                    setFriends={setFriends}
                    setNotification={setNotification}
                  />
                }
              />
              <Route
                path='suggested'
                element={
                  <SuggestedFriends
                    people={people}
                    friends={friends}
                    setFriends={setFriends}
                    setNotification={setNotification}
                    countries={countries}
                  />
                }
              />
            </Route>
          }
          {user.firstName !== "" &&
          <Route
            path='/friends/:id'
            element={
              <FriendProfile countries={countries} />
            }
          />}
           {user.firstName !== "" &&
          <Route
            path='/country/:id'
            element={
              <Country countries={countries} />
            }
          />}
        </Routes>
      </main>
    </Router>
  );
}

