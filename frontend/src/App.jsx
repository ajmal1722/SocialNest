import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import HomePage from './pages/HomePage'
import router from './route/Router'
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
