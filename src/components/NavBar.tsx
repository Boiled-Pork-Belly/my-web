import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        textDecoration: 'none',
        color: isActive ? '#2563eb' : '#4b5563',
        fontWeight: isActive ? 600 : 400,
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        backgroundColor: isActive ? '#eff6ff' : 'transparent',
        transition: 'all 0.2s'
    });

    return (
        <nav>
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                gap: '1rem'
            }}>
                <li>
                    <NavLink to="/" style={linkStyle}>홈</NavLink>
                </li>
                <li>
                    <NavLink to="/team" style={linkStyle}>팀 소개</NavLink>
                </li>
                <li>
                    <NavLink to="/project" style={linkStyle}>프로젝트</NavLink>
                </li>
            </ul>
        </nav>
    );
}