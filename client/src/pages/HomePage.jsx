import { useState, useEffect } from 'react';
import { getAllPrompts, createPrompt } from '../api/promptApi';
import PromptList from '../components/PromptList';
import PromptForm from '../components/PromptForm';

const CATEGORIES = ['All', 'Image', 'Text', 'Video'];

const HomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => { fetchPrompts(); }, []);

  const fetchPrompts = async () => {
    const res = await getAllPrompts();
    setPrompts(res.data);
  };

  const handleCreate = async (data) => {
    await createPrompt(data);
    await fetchPrompts();
    setShowForm(false);
  };

  const handleDelete = (id) => setPrompts(prev => prev.filter(p => p.id !== id));

  const filtered = prompts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  const modelCount = prompts.reduce((acc, p) => { acc[p.model] = (acc[p.model] || 0) + 1; return acc; }, {});
  const topModel = Object.entries(modelCount).sort((a,b)=>b[1]-a[1])[0];

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.topbar}>
          <div style={s.logo}>
            <div style={s.logoDot}></div>
            <span style={s.logoText}>Prompt Manager</span>
          </div>
          <button onClick={() => setShowForm(true)} style={s.btnNew}>+ New prompt</button>
        </div>

        <div style={s.stats}>
          {[
            { num: prompts.length, label: 'Total prompts' },
            { num: prompts.filter(p=>p.category==='image').length, label: 'Image prompts' },
            { num: prompts.filter(p=>p.category==='text').length, label: 'Text prompts' },
            { num: topModel ? `${topModel[0]}` : '—', label: 'Top model', small: true },
          ].map((s2, i) => (
            <div key={i} style={s.statCard}>
              <div style={{...s.statNum, fontSize: s2.small ? '14px' : '24px'}}>{s2.num}</div>
              <div style={s.statLabel}>{s2.label}</div>
            </div>
          ))}
        </div>

        <div style={s.toolbar}>
          <input
            placeholder="Search prompts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={s.search}
          />
          <div style={s.filters}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                style={{...s.filterBtn, ...(activeCategory===c ? s.filterActive : {})}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <PromptList prompts={filtered} onDelete={handleDelete} />
      </div>

      {showForm && <PromptForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
    </div>
  );
};

const s = {
  page: { minHeight:'100vh', background:'#080810', fontFamily:'sans-serif' },
  container: { maxWidth:'960px', margin:'0 auto', padding:'28px 20px' },
  topbar: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' },
  logo: { display:'flex', alignItems:'center', gap:'8px' },
  logoDot: { width:'8px', height:'8px', borderRadius:'50%', background:'#7c3aed' },
  logoText: { fontSize:'15px', fontWeight:'500', color:'#e0e0e0' },
  btnNew: { background:'#7c3aed', color:'#fff', border:'none', padding:'8px 16px', borderRadius:'8px', fontSize:'13px', cursor:'pointer' },
  stats: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'20px' },
  statCard: { background:'#0f0f17', border:'1px solid #1e1e2e', borderRadius:'10px', padding:'14px 16px' },
  statNum: { fontWeight:'500', color:'#e0e0e0', marginBottom:'4px' },
  statLabel: { fontSize:'11px', color:'#555' },
  toolbar: { display:'flex', gap:'12px', alignItems:'center', marginBottom:'20px', flexWrap:'wrap' },
  search: { flex:1, minWidth:'200px', padding:'8px 12px', borderRadius:'8px', border:'1px solid #1e1e2e', background:'#0f0f17', color:'#e0e0e0', fontSize:'13px', outline:'none' },
  filters: { display:'flex', gap:'6px' },
  filterBtn: { padding:'7px 14px', borderRadius:'8px', border:'1px solid #1e1e2e', background:'transparent', color:'#555', fontSize:'12px', cursor:'pointer' },
  filterActive: { borderColor:'#7c3aed', color:'#a78bfa', background:'#7c3aed15' },
};

export default HomePage;