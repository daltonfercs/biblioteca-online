import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    year: '',
    pages: '',
    price: '',
    stock: '',
    cover: '',
    description: '',
    available: true,
    rating: '',
    publisher: '',
    isbn: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          pages: Number(form.pages),
          price: Number(form.price),
          stock: Number(form.stock),
          rating: Number(form.rating),
          available: Boolean(form.available)
        })
      });
      if (!res.ok) throw new Error('Error al agregar libro');
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('No se pudo agregar el libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-page" style={{ maxWidth: 500, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>Agregar Nuevo Libro</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Autor" value={form.author} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} required />
        <input name="year" placeholder="Año" type="number" value={form.year} onChange={handleChange} required />
        <input name="pages" placeholder="Páginas" type="number" value={form.pages} onChange={handleChange} required />
        <input name="price" placeholder="Precio" type="number" value={form.price} onChange={handleChange} required />
        <input name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} required />
        <input name="cover" placeholder="URL de la imagen" value={form.cover} onChange={handleChange} required />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} required />
        <label style={{display:'flex',alignItems:'center',gap:8}}>
          <input name="available" type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
          Disponible
        </label>
        <input name="rating" placeholder="Calificación (1-5)" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={handleChange} required />
        <input name="publisher" placeholder="Editorial" value={form.publisher} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Agregando...' : 'Agregar Libro'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 8 }}>¡Libro agregado!</p>}
    </div>
  );
};

export default AddBook;
