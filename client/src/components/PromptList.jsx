import PromptCard from './PromptCard';

const PromptList = ({ prompts, onDelete }) => {
  if (prompts.length === 0) {
    return (
      <div style={s.empty}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
        <p style={s.emptyText}>No prompts yet. Create your first one!</p>
      </div>
    );
  }
  return (
    <div style={s.grid}>
      {prompts.map(p => <PromptCard key={p.id} prompt={p} onDelete={onDelete} />)}
    </div>
  );
};

const s = {
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'12px' },
  empty: { textAlign:'center', padding:'4rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' },
  emptyText: { color:'#444', fontSize:'13px' },
};

export default PromptList;