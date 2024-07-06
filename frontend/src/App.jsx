import './App.css'
import router from './route/Router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/ReactToastify.css'
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
