import { Outlet } from "react-router-dom"
import { useState } from "react"

const MainLayout = () => {
  const [user, setUser] = useState(null)

  function loginUser() {
    setUser('Ajmal')
  }
  return (
    <div>
      <div className="flex justify-around items-center h-20">
        <h1 className="text-2xl text-green-600 font-semibold">
          NavBar
        </h1>
        {
          user && 
          <button className="bg-gray-300 px-6 p-2 rounded-lg">
          {user}
        </button>
        }

      </div>
      <Outlet context={{ user, setUser, loginUser }} />
    </div>
  )
}

export default MainLayout
