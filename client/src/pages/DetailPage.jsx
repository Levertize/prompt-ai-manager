import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPromptById, updatePrompt } from '../api/promptApi';
import PromptForm from '../components/PromptForm';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    getPromptById(id).then(res => setPrompt(res.data));
  }, [id]);

  const handleUpdate = async (data) => {
    await updatePrompt(id, data);
    const res = await getPromptById(id);
    setPrompt(res.data);
    setShowEdit(false);
  };

  if (!prompt) return <p style={{ color: '#fff', textAlign: 'center', marginTop: '3rem' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.btnBack}>← Kembali</button>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{prompt.title}</h2>
          <span style={styles.model}>{prompt.model}</span>
        </div>
        <p style={styles.content}>{prompt.content}</p>
        <div style={styles.meta}>
          <span>🌡 Temperature: {prompt.temperature}</span>
          <span>📅 {new Date(prompt.created_at).toLocaleDateString('id-ID')}</span>
        </div>
        <div style={styles.tags}>
          {prompt.tags?.map((tag, i) => (
            <span key={i} style={styles.tag}>#{tag}</span>
          ))}
        </div>
        <button onClick={() => setShowEdit(true)} style={styles.btnEdit}>✏️ Edit Prompt</button>
      </div>

      {showEdit && (
        <PromptForm
          initialData={prompt}
          onSubmit={handleUpdate}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' },
  btnBack: { background: 'transparent', border: '1px solid #444', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '1.5rem' },
  card: { background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  title: { color: '#fff', margin: 0 },
  model: { background: '#7c3aed', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' },
  content: { color: '#ccc', lineHeight: 1.7, marginBottom: '1.5rem', whiteSpace: 'pre-wrap' },
  meta: { display: 'flex', gap: '1.5rem', color: '#888', fontSize: '13px', marginBottom: '1rem' },
  tags: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' },
  tag: { background: '#2a2a3e', color: '#a78bfa', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' },
  btnEdit: { background: '#7c3aed', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
};

export default DetailPage;