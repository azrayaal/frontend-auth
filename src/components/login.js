import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const Logen = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      history.push('/dashboard');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullwidth is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="coloumns is-centered">
            <div className="coloumn is-4-desktop">
              <form className="box" onSubmit={Logen}>
                <div className="field mt-5">
                  <div className="has-tect-centered">{message}</div>
                  <label className="label">Email or Username</label>
                  <div className="controls">
                    <input type="text" name="" id="" className="input" placeholder="username" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input type="password" name="" id="" className="input" placeholder="****" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
