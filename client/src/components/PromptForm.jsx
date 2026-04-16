import { useState } from 'react';

const PromptForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    model: initialData?.model || 'gpt-4',
    temperature: initialData?.temperature || 0.7,
    tags: initialData?.tags?.join(', ') || '',
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
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{initialData ? 'Edit Prompt' : 'Tambah Prompt'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Judul</label>
            <input name="title" value={formData.title} onChange={handleChange} required style={styles.input} />
          </div>
          <div style={styles.field}>
            <label>Isi Prompt</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required rows={5} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label>Model</label>
            <select name="model" value={formData.model} onChange={handleChange} style={styles.input}>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude 3</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
          <div style={styles.field}>
            <label>Temperature: {formData.temperature}</label>
            <input type="range" name="temperature" min="0" max="1" step="0.1"
              value={formData.temperature} onChange={handleChange} style={{ width: '100%' }} />
          </div>
          <div style={styles.field}>
            <label>Tags (pisah koma)</label>
            <input name="tags" value={formData.tags} onChange={handleChange}
              placeholder="contoh: coding, kreatif, SEO" style={styles.input} />
          </div>
          <div style={styles.buttons}>
            <button type="button" onClick={onCancel} style={styles.btnCancel}>Batal</button>
            <button type="submit" style={styles.btnSubmit}>{initialData ? 'Update' : 'Simpan'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modal: { background: '#1e1e2e', padding: '2rem', borderRadius: '12px', width: '500px', maxWidth: '90vw', color: '#fff' },
  field: { marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '4px' },
  input: { padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#2a2a3e', color: '#fff', fontSize: '14px' },
  buttons: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' },
  btnCancel: { padding: '8px 16px', borderRadius: '6px', border: '1px solid #666', background: 'transparent', color: '#fff', cursor: 'pointer' },
  btnSubmit: { padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#7c3aed', color: '#fff', cursor: 'pointer' },
};

export default PromptForm;