import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Projeto ${Date.now()}`,
      url: "https://github.com/rodrigo98rm/gostack-conceitos-reactjs-n1.2",
      techs: ["React", "Babel", "Webpack"]
    });

    const newRepo = response.data;
    setRepos([...repos, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const updatedRepos = repos.filter(repo => repo.id !== id);

    setRepos(updatedRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
