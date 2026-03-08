import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmosCanvas from './Galaxy/CosmosCanvas';
import onoLogo from '../assets/onoL.png';
import brainMeme from '../assets/brain.jpg';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMeme, setShowMeme] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setIsLoading(true);
        // Simulate login — no backend
        setTimeout(() => {
            setIsLoading(false);
            setError('Invalid credentials. (No backend connected)');
            // Show the meme for 2 seconds
            setShowMeme(true);
            setTimeout(() => setShowMeme(false), 2000);
        }, 1800);
    };

    return (
        <div className="admin-login-page">
            {/* Same 3D cosmic background as the hero section */}
            <CosmosCanvas />

            {/* Brain meme popup */}
            <AnimatePresence>
                {showMeme && (
                    <motion.div
                        className="admin-meme-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={brainMeme}
                            alt="Hey, you dropped this"
                            className="admin-meme-img"
                            initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="admin-login-card"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Logo / Brand */}
                <div className="admin-login-brand">
                    <motion.img
                        src={onoLogo}
                        alt="Oneiros Logo"
                        className="admin-login-logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <h1 className="admin-login-title">ONEIROS</h1>
                    <p className="admin-login-subtitle">Admin Portal</p>
                </div>

                {/* Divider */}
                <div className="admin-login-divider">
                    <span className="admin-login-divider-star">✦</span>
                </div>

                {/* Form */}
                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="admin-login-field">
                        <label htmlFor="admin-email">Email</label>
                        <div className="admin-login-input-wrap">
                            <span className="admin-login-input-icon">✉</span>
                            <input
                                id="admin-email"
                                type="email"
                                placeholder="admin@oneiros.muj.edu"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="admin-login-field">
                        <label htmlFor="admin-password">Password</label>
                        <div className="admin-login-input-wrap">
                            <span className="admin-login-input-icon">🔒</span>
                            <input
                                id="admin-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="admin-login-eye"
                                onClick={() => setShowPassword(v => !v)}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.p
                            className="admin-login-error"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        className="admin-login-btn"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? (
                            <span className="admin-login-spinner" />
                        ) : (
                            <>
                                <span>Sign In</span>
                                <span className="admin-login-btn-arrow">→</span>
                            </>
                        )}
                    </motion.button>
                </form>

                <p className="admin-login-footer-text">
                    Restricted access · <a href="/">Return to site</a>
                </p>
            </motion.div>
        </div>
    );
}
