import { useNavigate } from 'react-router-dom';
import { deletePrompt } from '../api/promptApi';

const PromptCard = ({ prompt, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Hapus prompt ini?')) {
      await deletePrompt(prompt.id);
      onDelete(prompt.id);
    }
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/prompt/${prompt.id}`)}>
      <div style={styles.header}>
        <h3 style={styles.title}>{prompt.title}</h3>
        <span style={styles.model}>{prompt.model}</span>
      </div>
      <p style={styles.content}>{prompt.content.slice(0, 100)}...</p>
      <div style={styles.footer}>
        <div style={styles.tags}>
          {prompt.tags?.map((tag, i) => (
            <span key={i} style={styles.tag}>#{tag}</span>
          ))}
        </div>
        <div style={styles.actions}>
          <span style={styles.temp}>🌡 {prompt.temperature}</span>
          <button onClick={handleDelete} style={styles.btnDelete}>🗑</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { background: '#1e1e2e', border: '1px solid #2a2a3e', borderRadius: '12px', padding: '1.2rem', cursor: 'pointer', transition: 'border-color 0.2s', marginBottom: '1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  title: { margin: 0, color: '#fff', fontSize: '16px' },
  model: { background: '#7c3aed', color: '#fff', padding: '2px 8px', borderRadius: '20px', fontSize: '12px' },
  content: { color: '#888', fontSize: '14px', marginBottom: '12px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tags: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tag: { background: '#2a2a3e', color: '#a78bfa', padding: '2px 8px', borderRadius: '20px', fontSize: '12px' },
  actions: { display: 'flex', alignItems: 'center', gap: '8px' },
  temp: { color: '#888', fontSize: '12px' },
  btnDelete: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' },
};

export default PromptCard;