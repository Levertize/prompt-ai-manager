const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET semua prompt
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM prompts ORDER BY created_at DESC');
  res.json(result.rows);
});

// GET satu prompt
router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM prompts WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

// CREATE prompt
router.post('/', async (req, res) => {
  const { title, content, model, temperature, tags } = req.body;
  const result = await pool.query(
    'INSERT INTO prompts (title, content, model, temperature, tags) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [title, content, model, temperature, tags]
  );
  res.status(201).json(result.rows[0]);
});

// UPDATE prompt
router.put('/:id', async (req, res) => {
  const { title, content, model, temperature, tags } = req.body;
  const result = await pool.query(
    'UPDATE prompts SET title=$1, content=$2, model=$3, temperature=$4, tags=$5, updated_at=NOW() WHERE id=$6 RETURNING *',
    [title, content, model, temperature, tags, req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE prompt
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM prompts WHERE id = $1', [req.params.id]);
  res.json({ message: 'Prompt deleted' });
});

module.exports = router;