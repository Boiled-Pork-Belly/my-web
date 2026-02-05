import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import WeatherWidget from '../components/WeatherWidget'; // 날씨 위젯 추가

export default function HomePage() {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    // 스크롤 애니메이션 훅: 각 섹션별로 ref와 visibility 상태를 따로 관리합니다.
    // threshold: 화면의 몇 %가 보일 때 애니메이션을 시작할지 결정 (0.1 = 10%)
    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);
    const { ref: featureRef, isVisible: featureVisible } = useScrollAnimation(0.2);

    return (
        <div className="home-container">
            {/* Hero Section: 메인 배너 영역 */}
            <section className="hero-section">
                <div className="hero-bg-overlay"></div> {/* 배경 이미지 오버레이 */}
                <div
                    ref={heroRef}
                    className="hero-content"
                    style={{
                        // 등장 애니메이션: 투명도와 Y축 이동을 동시에 제어
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1s ease-out, transform 1s ease-out'
                    }}
                >
                    <span style={{ color: '#ef4444', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Next Generation Studio
                    </span>
                    <h1 className="hero-title">
                        WE DON'T MAKE GAMES<br />
                        WE BUILD WORLDS
                    </h1>
                    <p className="hero-subtitle">
                        단순한 플레이를 넘어선 압도적인 몰입감.
                        <br />상상 그 이상의 세계를 창조하는 차세대 게임 스튜디오입니다.
                    </p>
                    {/* CTA 버튼: 클릭 시 프로젝트 대시보드로 이동 */}
                    <button onClick={() => navigate('/project')} className="cta-button">
                        프로젝트 확인하기 →
                    </button>
                </div>
            </section>

            {/* Showcase Section: 게임 비주얼 갤러리 */}
            <section
                className="showcase-section"
                ref={featureRef}
                style={{
                    opacity: featureVisible ? 1 : 0,
                    transform: featureVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: 'opacity 1s ease-out, transform 1s ease-out',
                    transitionDelay: '0.2s' // Hero 섹션보다 약간 늦게 등장
                }}
            >
                {/* Showcase Card 1 */}
                <div className="showcase-card">
                    <img src="/assets/fantasy_rpg.png" alt="Elden Souls" className="showcase-image" />
                    <div className="showcase-overlay">
                        <h3 className="showcase-title">Elden Souls</h3>
                        <p className="showcase-desc">Unreal Engine 5로 구현된 압도적인 다크 판타지 액션</p>
                    </div>
                </div>

                {/* Showcase Card 2 */}
                <div className="showcase-card">
                    <img src="/assets/scifi_city.png" alt="Neon Horizon" className="showcase-image" />
                    <div className="showcase-overlay">
                        <h3 className="showcase-title">Neon Horizon</h3>
                        <p className="showcase-desc">사이버펑크 오픈월드에서 펼쳐지는 무한한 자유도</p>
                    </div>
                </div>

                {/* Showcase Card 3 */}
                <div className="showcase-card">
                    <img src="/assets/strategy_map.png" alt="Kingdom Tactics" className="showcase-image" />
                    <div className="showcase-overlay">
                        <h3 className="showcase-title">Kingdom Tactics</h3>
                        <p className="showcase-desc">전 세계 유저와 경쟁하는 4X 전략 시뮬레이션</p>
                    </div>
                </div>
            </section>

            {/* Stats Section: 성과 지표 영역 (숫자 강조) */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-number">10M+</span>
                        <span className="stat-label">Global Downloads</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">98%</span>
                        <span className="stat-label">Positive Reviews</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">2026</span>
                        <span className="stat-label">GOTY Nominee</span>
                    </div>
                </div>

                {/* 날씨 위젯 - 스튜디오 현황 */}
                <div style={{ marginTop: '3rem' }}>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        🏢 서울 스튜디오 현재 날씨
                    </p>
                    <WeatherWidget />
                </div>
            </section>
        </div>
    );
}