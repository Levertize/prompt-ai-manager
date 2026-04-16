import { useState } from 'react';

const MODELS = [
  { group: 'Image — Stable Diffusion', options: ['SD 1.5', 'SD 2.1', 'SDXL', 'SD Turbo', 'Z-Turbo'] },
  { group: 'Image — Flux', options: ['Flux Dev', 'Flux Schnell', 'Flux Pro'] },
  { group: 'Image — Other', options: ['Midjourney Style', 'DALL-E 3', 'Ideogram'] },
  { group: 'Text / Chat', options: ['GPT-4o', 'GPT-3.5 Turbo', 'Claude 3.5', 'Gemini Pro'] },
  { group: 'Video', options: ['Sora', 'Runway Gen-3', 'Kling'] },
];

const PromptForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    model: initialData?.model || 'SDXL',
    temperature: initialData?.temperature || 7.5,
    tags: initialData?.tags?.join(', ') || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || 'image',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      temperature: parseFloat(formData.temperature),
    });
  };

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <div style={s.modalHeader}>
          <h2 style={s.modalTitle}>{initialData ? 'Edit prompt' : 'New prompt'}</h2>
          <button onClick={onCancel} style={s.btnClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={s.row}>
            <div style={{...s.field, flex: 2}}>
              <label style={s.label}>Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required style={s.input} placeholder="e.g. Cinematic portrait" />
            </div>
            <div style={{...s.field, flex: 1}}>
              <label style={s.label}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} style={s.input}>
                <option value="image">Image</option>
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Prompt content</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required rows={4} style={{...s.input, resize: 'vertical'}} placeholder="Tulis promptnya di sini..." />
          </div>

          <div style={s.row}>
            <div style={{...s.field, flex: 1}}>
              <label style={s.label}>Model</label>
              <select name="model" value={formData.model} onChange={handleChange} style={s.input}>
                {MODELS.map(g => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div style={{...s.field, flex: 1}}>
              <label style={s.label}>CFG Scale / Temp: <strong>{formData.temperature}</strong></label>
              <input type="range" name="temperature" min="1" max="20" step="0.5"
                value={formData.temperature} onChange={handleChange} style={{width:'100%', marginTop: '10px'}} />
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Image preview URL <span style={{color:'#666'}}>(opsional — paste URL hasil generate)</span></label>
            <input name="image_url" value={formData.image_url} onChange={handleChange} style={s.input} placeholder="https://..." />
          </div>

          {formData.image_url && (
            <div style={s.imgPreview}>
              <img src={formData.image_url} alt="preview" style={{width:'100%', height:'140px', objectFit:'cover', borderRadius:'6px'}} onError={(e)=>e.target.style.display='none'} />
            </div>
          )}

          <div style={s.field}>
            <label style={s.label}>Tags <span style={{color:'#666'}}>(pisah koma)</span></label>
            <input name="tags" value={formData.tags} onChange={handleChange} style={s.input} placeholder="portrait, cinematic, realism" />
          </div>

          <div style={s.buttons}>
            <button type="button" onClick={onCancel} style={s.btnCancel}>Cancel</button>
            <button type="submit" style={s.btnSubmit}>{initialData ? 'Update' : 'Save prompt'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const s = {
  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999, backdropFilter:'blur(4px)' },
  modal: { background:'#0f0f17', border:'1px solid #2a2a3e', padding:'1.5rem', borderRadius:'14px', width:'560px', maxWidth:'92vw', color:'#fff', maxHeight:'90vh', overflowY:'auto' },
  modalHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.2rem' },
  modalTitle: { fontSize:'16px', fontWeight:'500', color:'#fff' },
  btnClose: { background:'transparent', border:'none', color:'#666', fontSize:'18px', cursor:'pointer' },
  row: { display:'flex', gap:'12px' },
  field: { marginBottom:'1rem', display:'flex', flexDirection:'column', gap:'6px' },
  label: { fontSize:'12px', color:'#888' },
  input: { padding:'8px 10px', borderRadius:'8px', border:'1px solid #2a2a3e', background:'#1a1a2a', color:'#fff', fontSize:'13px', outline:'none' },
  imgPreview: { marginBottom:'1rem', borderRadius:'8px', overflow:'hidden' },
  buttons: { display:'flex', justifyContent:'flex-end', gap:'8px', marginTop:'1.2rem', paddingTop:'1rem', borderTop:'1px solid #1a1a2a' },
  btnCancel: { padding:'8px 16px', borderRadius:'8px', border:'1px solid #333', background:'transparent', color:'#aaa', cursor:'pointer', fontSize:'13px' },
  btnSubmit: { padding:'8px 20px', borderRadius:'8px', border:'none', background:'#7c3aed', color:'#fff', cursor:'pointer', fontSize:'13px' },
};

export default PromptForm;