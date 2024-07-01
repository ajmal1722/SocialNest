import './App.css'
import UserLogin from './pages/UserLogin'
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
      <UserLogin/>
    </>
  )
}

export default App
