import './App.css'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import HomePage from './pages/HomePage'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
      <Route index element={<HomePage/>} />
      <Route path={'user/login'} element={<UserLogin/>} />
      <Route path={'user/signup'} element={<UserSignUp/>} />
      {/* <Route path={'*'} element={<NotFound/>} /> */}
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
