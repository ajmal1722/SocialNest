import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      
    </Route>
  )
)

function App() {

  return (
    <>
      <UserSignUp/>
      <UserLogin/>
    </>
  )
}

export default App
