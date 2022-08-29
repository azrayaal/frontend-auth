import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getUser();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.expire);
    } catch (error) {
      if (error.response) {
        history('/');
      }
    }
  };

  // cara menggunakan refresnya
  const axiosJWT = axios.create();

  // refresh token secara otomatis... SETIAP REQ YG MEMBUTUHKAN TOKEN< KITA BISA MEMAKAI AXIOSJWT
  axiosJWT.interceptors.request.use(
    async (config) => {
      // ambil waktu sekarang
      const currentDate = new Date();
      // bandingkan current date dengan exp token
      if (expire * 1000 < currentDate.getTime()) {
        // panggil refresh tokennya jika current date lebih kecil daripada exp token
        const response = await axios.get('http://localhost:5000/token');
        // update header config
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        // set lagi tokennya ke dalam token
        setToken(response.data.accessToken);
      }
      // balikin confignya
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUser = async () => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <div>
      <h1>Welcome Back: {name}</h1>
      <button className="button is-info" onClick={getUser}>
        Get user
      </button>
      <table className="table is-stripped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
