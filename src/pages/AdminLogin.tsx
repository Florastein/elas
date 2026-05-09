import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, UserPlus } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    if (isRegisterMode) {
      const err = await register(email, password);
      if (err) {
        setError(err);
        setSubmitting(false);
      } else {
        // Registration auto-signs in — redirect to dashboard
        navigate('/admin', { replace: true });
      }
    } else {
      const err = await login(email, password);
      if (err) {
        setError(err);
        setSubmitting(false);
      } else {
        navigate('/admin', { replace: true });
      }
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-surface border border-border flex items-center justify-center">
            {isRegisterMode ? (
              <UserPlus className="w-4 h-4 text-text-muted" />
            ) : (
              <Lock className="w-4 h-4 text-text-muted" />
            )}
          </div>
          <h1 className="text-xl font-semibold">
            {isRegisterMode ? 'Create Admin' : 'Admin'}
          </h1>
        </div>
        <p className="text-sm text-text-muted mb-8">
          {isRegisterMode ? 'Create an admin account.' : 'Sign in to manage orders.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-text-muted mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="admin@example.com"
              autoFocus
              required
              className="w-full py-3 px-4 rounded-xl border border-border bg-surface text-text-main text-sm outline-none focus:border-text-muted transition-colors placeholder:text-text-muted/40"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-text-muted mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full py-3 px-4 rounded-xl border border-border bg-surface text-text-main text-sm outline-none focus:border-text-muted transition-colors placeholder:text-text-muted/40"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
          {success && (
            <p className="text-xs text-emerald-500">{success}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`btn-primary w-full text-sm ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting
              ? (isRegisterMode ? 'Creating…' : 'Signing in…')
              : (isRegisterMode ? 'Create account' : 'Sign in')
            }
          </button>
        </form>

        <p className="text-center text-xs text-text-muted mt-6">
          {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={toggleMode} className="text-text-main font-medium hover:underline">
            {isRegisterMode ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
