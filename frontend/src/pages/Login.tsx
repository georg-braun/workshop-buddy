import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { authApi } from '../api';
import { authAtom } from '../store/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth({ token: data.token, user: { username: data.username } });
      navigate('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth({ token: data.token, user: { username: data.username } });
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      registerMutation.mutate({ username, password });
    } else {
      loginMutation.mutate({ username, password });
    }
  };

  const mutation = isRegister ? registerMutation : loginMutation;

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>
          {mutation.isError && (
            <div className="error-message">
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'An error occurred'}
            </div>
          )}
          <button type="submit" disabled={mutation.isPending} className="btn-primary">
            {mutation.isPending ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="login-toggle">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="btn-link"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
