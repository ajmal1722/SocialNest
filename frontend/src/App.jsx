import { ToastContainer } from 'react-toastify'
import './App.css'
import router from './route/Router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/ReactToastify.css'
function App() {

  return (
    <div className='bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
