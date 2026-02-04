import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../hooks/useTheme';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
            <header style={{
                backgroundColor: 'var(--bg-primary)',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                boxShadow: 'var(--card-shadow)',
                transition: 'background-color 0.3s, border-color 0.3s'
            }}>
                <div style={{
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>🚀</span>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                            Clap Campus
                        </h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <NavBar />
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                color: 'var(--text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </header>

            <main style={{
                flexGrow: 1,
                backgroundColor: 'var(--bg-secondary)',
                width: '100%',
                transition: 'background-color 0.3s'
            }}>
                <div style={{
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '3rem 2rem',
                    minHeight: 'calc(100vh - 4rem - 5rem)'
                }}>
                    <Outlet />
                </div>
            </main>

            <footer style={{
                backgroundColor: 'var(--bg-primary)',
                borderTop: '1px solid var(--border-color)',
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                transition: 'background-color 0.3s, border-color 0.3s'
            }}>
                <p style={{ margin: 0 }}>© 2026 Clap Campus. All rights reserved.</p>
            </footer>
        </div>
    );
}