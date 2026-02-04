import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../hooks/useTheme';
import './Layout.css';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-content">
                    <div className="brand">
                        <span className="logo-icon">🚫</span>
                        <h1>우린 게임 안만듬</h1>
                    </div>

                    <div className="nav-container">
                        <NavBar />
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="app-main">
                <div className="main-content">
                    <Outlet />
                </div>
            </main>

            <footer className="app-footer">
                <p>© 2026 We Don't Make Games. All rights reserved.</p>
            </footer>
        </div>
    );
}