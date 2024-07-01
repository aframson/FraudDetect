// pages/dashboard.js
import { useSession, getSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchTransactions = async () => {
        try {
          const res = await axios.get('http://127.0.0.1:8000/transactions', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          setTransactions(res.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTransactions();
    }
  }, [session]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>You must be signed in to view this page</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <button className={styles.logoutButton} onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.trans_date).toLocaleString()}</td>
              <td>{transaction.cc_num}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}
