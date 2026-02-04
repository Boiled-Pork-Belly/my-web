import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useTheme } from '../hooks/useTheme';
import './Layout.css';

export default function Layout() {
    // 다크 모드/라이트 모드 전환 훅
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="app-layout">
            {/* 상단 헤더: 로고 및 네비게이션 */}
            <header className="app-header">
                <div className="header-content">
                    <div className="brand">
                        <span className="logo-icon">🚫</span>
                        <h1>우린 게임 안만듬</h1>
                    </div>

                    <div className="nav-container">
                        <NavBar /> {/* 페이지 이동 링크 */}
                        {/* 테마 전환 버튼 (달/해 아이콘) */}
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

            {/* 메인 콘텐츠 영역: 실제 페이지 내용이 Rendering 되는 곳 */}
            <main className="app-main">
                <div className="main-content">
                    <Outlet /> {/* React Router의 Outlet: 자식 라우트 컴포넌트가 여기에 표시됨 */}
                </div>
            </main>

            {/* 하단 푸터 */}
            <footer className="app-footer">
                <p>© 2026 We Don't Make Games. All rights reserved.</p>
            </footer>
        </div>
    );
}