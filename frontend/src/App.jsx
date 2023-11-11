import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreateGame from './pages/CreateGame'
import CreatePlayer from './pages/CreatePlayer'
import DeleteGame from './pages/DeleteGame'
import DeletePlayer from './pages/DeletePlayer'
import EditGame from './pages/EditGame'
import EditPlayer from './pages/EditPlayer'
import ShowPlayerGameHistory from './pages/ShowPlayerGameHistory'
import AllGames from './pages/AllGames'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/players/create" element={<CreatePlayer />} />
      <Route path="/players/delete/:id" element={<DeletePlayer />} />
      <Route path="/players/edit/:id" element={<EditPlayer />} />
      <Route path="/players/:name" element={<ShowPlayerGameHistory />} />
      <Route path="/games/all" element={<AllGames />} />
      <Route path="/games/create" element={<CreateGame />} />
      <Route path="/games/delete/:id" element={<DeleteGame />} />
      <Route path="/games/edit/:id" element={<EditGame />} />
    </Routes>
  )
}

export default App