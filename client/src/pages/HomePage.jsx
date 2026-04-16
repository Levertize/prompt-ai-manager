import { useState, useEffect } from 'react';
import { getAllPrompts, createPrompt } from '../api/promptApi';
import PromptList from '../components/PromptList';
import PromptForm from '../components/PromptForm';

const HomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    const res = await getAllPrompts();
    setPrompts(res.data);
  };

  const handleCreate = async (data) => {
    await createPrompt(data);
    await fetchPrompts();
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  const filtered = prompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase())
  );

  // Statistik
  const modelCount = prompts.reduce((acc, p) => {
    acc[p.model] = (acc[p.model] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🧠 Prompt Manager</h1>
        <button onClick={() => setShowForm(true)} style={styles.btnAdd}>+ Tambah Prompt</button>
      </div>

      {/* Statistik */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statNum}>{prompts.length}</span>
          <span style={styles.statLabel}>Total Prompt</span>
        </div>
        {Object.entries(modelCount).map(([model, count]) => (
          <div key={model} style={styles.statCard}>
            <span style={styles.statNum}>{count}</span>
            <span style={styles.statLabel}>{model}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        placeholder="🔍 Cari prompt..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <PromptList prompts={filtered} onDelete={handleDelete} />

      {showForm && (
        <PromptForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  title: { color: '#fff', margin: 0 },
  btnAdd: { background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  stats: { display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
  statCard: { background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '10px', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '100px' },
  statNum: { color: '#a78bfa', fontSize: '28px', fontWeight: 'bold' },
  statLabel: { color: '#888', fontSize: '12px' },
  search: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #444', background: '#1e1e2e', color: '#fff', marginBottom: '1.5rem', fontSize: '14px', boxSizing: 'border-box' },
};

export default HomePage;