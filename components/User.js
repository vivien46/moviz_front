import React, { useState, useEffect } from 'react';
import Styles from '../styles/User.module.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fait un appel à l'API pour récupérer la liste des utilisateurs
    fetch('http://moviz-back-seven.vercel.app/users') 
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []); // Met à jour l'état avec les utilisateurs
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur lors du chargement : {error.message}</p>;

  return (
    <div>
      <h1 className={Styles.title1}>Liste des utilisateurs</h1>
      <div  className={Styles.data}>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} : {user.email}
          </li>
        ))}
      </ul>
        </div>
    </div>
  );
};

export default User;