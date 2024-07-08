import './App.css'
import router from './route/Router'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/ReactToastify.css'
function App() {

  return (
    <div className='bg-primary-light dark:bg-primary-dark'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
