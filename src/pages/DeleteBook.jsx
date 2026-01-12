import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user || user.email !== 'demo@biblioteca.com') {
    return <div style={{padding:32, textAlign:'center'}}>No autorizado</div>;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(`http://localhost:8082/api/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('No se pudo eliminar el libro');
      setSuccess(true);
      setTimeout(() => navigate('/catalogo'), 1500);
    } catch (err) {
      setError('Error al eliminar libro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-book-page" style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>Eliminar Libro</h2>
      <form onSubmit={handleDelete} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="bookId" placeholder="ID del libro" value={bookId} onChange={e => setBookId(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? 'Eliminando...' : 'Eliminar Libro'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 8 }}>¡Libro eliminado!</p>}
    </div>
  );
};

export default DeleteBook;
