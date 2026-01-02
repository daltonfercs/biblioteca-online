import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTitle from '../components/ui/PageTitle';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const result = login(email, password);
        if (result.success) {
          navigate('/catalogo');
        } else {
          setError(result.error);
        }
      } else {
        if (!name.trim()) {
          setError('Por favor ingresa tu nombre');
          setLoading(false);
          return;
        }
        const result = register(email, password, name);
        if (result.success) {
          navigate('/catalogo');
        } else {
          setError(result.error);
        }
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '0 1rem' }}>
      <PageTitle title={isLogin ? 'Iniciar Sesión' : 'Registrarse'} />

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        {!isLogin && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength="6"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        <Button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
        </Button>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '1rem'
            }}
          >
            {isLogin ? 'Crear una cuenta' : 'Inicia sesión aquí'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
