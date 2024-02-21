import React from 'react'
import axios from 'axios';
const Navbar = () => {
  
  const token = localStorage.getItem("AuthToken");

  const handleLogout = async() => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/auth/logout`, {
        headers: {
          'X-API-TOKEN': token
        }
      });

      console.log(response.data)
      window.location.replace('/')
    } catch (error) {
      
    }
  }
  return (
    <div>
        <div className="ml-64 py-[13px] px-2 bg-[#1D5D9B] flex items-center justify-between shadow-xl">
            <div className=""> <p className='text-white text-lg font-bold'>Inventory Application</p></div>
            <div className="bg-red-500 px-2 py-2 rounded-md cursor-pointer">
                <h1 className='cursor-pointer text-white font-bold' onClick={handleLogout}>Logout</h1>
            </div>
        </div>

    </div>
  )
}

export default Navbar