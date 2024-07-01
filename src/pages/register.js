// pages/register.js
import { useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css'
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/register', {
        username,
        email,
        password,
        dob
      });
      if (res.data.access_token) {
        window.location.href = '/auth/signin';
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className={styles.container_reg} onSubmit={handleSubmit}>
        <label>
            
          <div>Username :</div>
          <input  className={styles.inp} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <div>Email :</div>
          <input className={styles.inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <div>Password :</div>
          <input className={styles.inp} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <div>Date of Birth: </div>
          <input className={styles.inp} type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
