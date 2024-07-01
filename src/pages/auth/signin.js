// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './login.module.css'
export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });

    if (!result.error) {
      window.location.href = '/dashboard';
    } else {
      console.error(result.error);
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
