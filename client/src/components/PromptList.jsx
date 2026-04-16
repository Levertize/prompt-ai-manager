import PromptCard from './PromptCard';

const PromptList = ({ prompts, onDelete }) => {
  if (prompts.length === 0) {
    return <p style={{ color: '#888', textAlign: 'center', marginTop: '3rem' }}>Belum ada prompt. Yuk tambah yang pertama! 🚀</p>;
  }

  return (
    <div>
      {prompts.map(p => (
        <PromptCard key={p.id} prompt={p} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default PromptList;