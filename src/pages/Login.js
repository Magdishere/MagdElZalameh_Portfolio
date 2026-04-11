import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
    dispatch(reset());
  }, [user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="glass-card p-10 w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
          <p className="text-secondary mt-2">Enter your credentials to manage your portfolio</p>
        </div>
        
        {isError && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full bg-accent bg-opacity-20 border border-secondary border-opacity-20 p-3 rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center">
           <button onClick={() => navigate('/')} className="text-sm text-secondary hover:text-primary transition-colors">← Back to Portfolio</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
