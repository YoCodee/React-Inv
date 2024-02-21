import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Menghapus pesan error sebelum melakukan validasi
    setError('');

    // Validasi untuk memastikan username dan password tidak kosong
    if (!username || !password) {
      setError('Mohon lengkapi username dan password Anda');
      return;
    }

    try {
      const response = await axios.post('http://217.196.48.228:8080/api/auth/login', {
        username: username,
        password: password,
      });

      const user = response.data;
      const token = user.data.token;
      console.log(token);
      localStorage.setItem('AuthToken', token);
      window.location.replace('/dashboard');
    } catch (error) {
      // Menangani error dari permintaan login
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      }
    }
  };

  return (
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden bg-slate-500 text-center text-white lg:block">
          <h1 className="font-bold text-3xl flex justify-center items-center mt-72">SMK Negeri 1 Pangkalpinang</h1>
          <h1 className="font-bold text-xl flex justify-center items-center mt-6">Inventory</h1>
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form action="#" method="POST" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
