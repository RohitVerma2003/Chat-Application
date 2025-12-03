import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Channels from './pages/Channels/Channels'
import CreateChannel from './pages/CreateChannel/CreateChannel'

function App () {
  const { authUser } = useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route
          exact
          path='/'
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          exact
          path='/channels'
          element={authUser ? <Channels /> : <Navigate to={'/login'} />}
        />
        <Route
          exact
          path='/createChannel'
          element={authUser ? <CreateChannel /> : <Navigate to={'/login'} />}
        />
        <Route
          exact
          path='/login'
          element={authUser ? <Navigate to={'/'} /> : <Login />}
        />
        <Route
          exact
          path='/signup'
          element={authUser ? <Navigate to={'/'} /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
