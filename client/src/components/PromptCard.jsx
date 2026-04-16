import { useNavigate } from 'react-router-dom';
import { deletePrompt } from '../api/promptApi';

const MODEL_COLOR = {
  'SDXL': '#c084fc', 'SD 1.5': '#c084fc', 'SD 2.1': '#c084fc',
  'SD Turbo': '#e879f9', 'Z-Turbo': '#e879f9',
  'Flux Dev': '#60a5fa', 'Flux Schnell': '#60a5fa', 'Flux Pro': '#93c5fd',
  'GPT-4o': '#4ade80', 'GPT-3.5 Turbo': '#86efac', 'Claude 3.5': '#fb923c',
  'Gemini Pro': '#facc15', 'Midjourney Style': '#f472b6',
  'DALL-E 3': '#38bdf8', 'Sora': '#f87171', 'Kling': '#fb923c',
};

const PromptCard = ({ prompt, onDelete }) => {
  const navigate = useNavigate();
  const color = MODEL_COLOR[prompt.model] || '#888';

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Hapus prompt ini?')) {
      await deletePrompt(prompt.id);
      onDelete(prompt.id);
    }
  };

  return (
    <div style={s.card} onClick={() => navigate(`/prompt/${prompt.id}`)}>
      <div style={{...s.imgWrap, background: prompt.image_url ? 'transparent' : '#1a1a2a'}}>
        {prompt.image_url
          ? <img src={prompt.image_url} alt={prompt.title} style={s.img} onError={(e)=>e.target.style.display='none'} />
          : <div style={s.imgPlaceholder}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            </div>
        }
        <div style={{...s.modelBadge, color, borderColor: color + '40', background: color + '15'}}>
          {prompt.model}
        </div>
      </div>
      <div style={s.body}>
        <div style={s.title}>{prompt.title}</div>
        <div style={s.desc}>{prompt.content?.slice(0, 80)}...</div>
        <div style={s.footer}>
          <div style={s.tags}>
            {prompt.tags?.slice(0, 2).map((tag, i) => (
              <span key={i} style={s.tag}>#{tag}</span>
            ))}
          </div>
          <div style={s.right}>
            <span style={s.cfg}>cfg {prompt.temperature}</span>
            <button onClick={handleDelete} style={s.btnDel}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const s = {
  card: { background:'#0f0f17', border:'1px solid #1e1e2e', borderRadius:'12px', overflow:'hidden', cursor:'pointer', transition:'border-color 0.15s' },
  imgWrap: { height:'120px', position:'relative', overflow:'hidden' },
  img: { width:'100%', height:'100%', objectFit:'cover', display:'block' },
  imgPlaceholder: { width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' },
  modelBadge: { position:'absolute', top:'8px', right:'8px', fontSize:'10px', padding:'2px 7px', borderRadius:'20px', border:'1px solid', backdropFilter:'blur(4px)', fontWeight:'500' },
  body: { padding:'10px 12px' },
  title: { fontSize:'13px', fontWeight:'500', color:'#e0e0e0', marginBottom:'4px' },
  desc: { fontSize:'11px', color:'#555', marginBottom:'10px', lineHeight:'1.5' },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  tags: { display:'flex', gap:'4px' },
  tag: { fontSize:'10px', padding:'2px 6px', borderRadius:'20px', background:'#1a1a2a', color:'#666' },
  right: { display:'flex', alignItems:'center', gap:'8px' },
  cfg: { fontSize:'10px', color:'#444' },
  btnDel: { background:'transparent', border:'none', cursor:'pointer', color:'#444', padding:'2px', display:'flex', alignItems:'center' },
};

export default PromptCard;