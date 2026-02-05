import './TeamPage.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { Member } from '../types/Member';
import WeatherWidget from '../components/WeatherWidget'; // 날씨 위젯 추가

const members: Member[] = [
    {
        id: 1,
        name: '강민혁',
        role: 'Game Director (PD)',
        emoji: '👑',
        bio: '프로젝트의 전체 비전을 제시하고 개발 방향성을 이낍니다. "재미는 타협하지 않는다"는 철학을 가지고 있습니다.',
        skills: ['Vision', 'Leadership', 'Decision Making', 'Global Market']
    },
    {
        id: 2,
        name: '김철수',
        role: 'Client Lead',
        emoji: '🎮',
        bio: 'Unity와 C#을 사용하여 몰입감 넘치는 게임 플레이를 구현합니다. 클라이언트 팀을 이끌며 기술적 난제를 해결합니다.',
        skills: ['Unity', 'C#', 'Architecture', 'Optimization']
    },
    {
        id: 3,
        name: '이영희',
        role: 'Server Architect',
        emoji: '🌐',
        bio: '실시간 멀티플레이어 게임을 위한 안정적인 분산 서버를 구축합니다. 대규모 트래픽 처리에 능숙합니다.',
        skills: ['C++', 'Go', 'Redis', 'AWS GameLift']
    },
    {
        id: 4,
        name: '정블라',
        role: 'Engine Programmer',
        emoji: '⚙️',
        bio: '상용 엔진의 한계를 넘어 커스텀 기능을 구현합니다. 렌더링 파이프라인 최적화와 물리 엔진 튜닝을 담당합니다.',
        skills: ['C++', 'DirectX/Vulkan', 'PhysX', 'Memory Mgmt']
    },
    {
        id: 5,
        name: '박민수',
        role: 'Art Director',
        emoji: '🎨',
        bio: '게임의 시각적 정체성을 정의하고 아트 리소스를 총괄합니다. 매혹적인 비주얼 스토리텔링을 추구합니다.',
        skills: ['Art Direction', 'Concept Art', 'Color Theory', 'Team Mgmt']
    },
    {
        id: 6,
        name: '최동욱',
        role: 'Technical Artist',
        emoji: '✨',
        bio: '아티스트와 개발자 사이의 가교역할을 합니다. 셰이더 제작과 파이프라인 자동화를 담당합니다.',
        skills: ['HLSL', 'Python', 'Houdini', 'VFX']
    },
    {
        id: 7,
        name: '송지아',
        role: '3D Modeler',
        emoji: '🗿',
        bio: '살아 숨쉬는 듯한 캐릭터와 디테일한 환경을 제작합니다. 토폴로지 최적화에도 신경 씁니다.',
        skills: ['ZBrush', 'Maya', 'Substance Painter', 'Retopology']
    },
    {
        id: 8,
        name: '류호성',
        role: 'Animator',
        emoji: '⚔️',
        bio: '캐릭터의 타격감과 역동적인 움직임을 만들어냅니다. 리깅(Rigging)부터 키프레임 애니메이션까지 소화합니다.',
        skills: ['3ds Max', 'Motion Builder', 'Rigging', 'Animation Blueprint']
    },
    {
        id: 9,
        name: '한유리',
        role: 'UI/UX Designer',
        emoji: '🖼️',
        bio: '직관적이고 아름다운 인터페이스를 설계합니다. 사용자가 정보를 쉽게 인지하고 조작할 수 있도록 돕습니다.',
        skills: ['Figma', 'UGUI', 'Interaction Design', 'Illustrator']
    },
    {
        id: 10,
        name: '조현우',
        role: 'Game Designer',
        emoji: '📝',
        bio: '재미있는 게임 메카닉스와 전투 공식을 설계합니다. 수치 밸런싱을 통해 긴장감 있는 플레이를 유도합니다.',
        skills: ['System Design', 'Excel (VBA)', 'Balancing', 'Math']
    },
    {
        id: 11,
        name: '임소희',
        role: 'Level Designer',
        emoji: '🗺️',
        bio: '플레이어의 동선을 고려하여 맵을 구성하고 몬스터를 배치합니다. 탐험의 재미와 전략적 요소를 설계합니다.',
        skills: ['Level Blocking', 'Unreal Editor', 'Pacing', 'Encounter']
    },
    {
        id: 12,
        name: '오세윤',
        role: 'Sound Designer',
        emoji: '🎵',
        bio: '게임의 분위기를 살리는 BGM과 타격감 있는 효과음을 제작합니다. 미들웨어(FMOD, Wwise) 활용이 가능합니다.',
        skills: ['Logic Pro', 'Wwise', 'Sound Design', 'Mixing']
    }
];

// 개별 카드 컴포넌트로 분리하여 각각 애니메이션 적용
function TeamCard({ member }: { member: Member }) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            className={`team-card ${isVisible ? 'visible' : ''}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
        >
            <div className="profile-wrapper">
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                    alt={member.name}
                    className="profile-img"
                />
                <span className="profile-emoji">{member.emoji}</span>
            </div>

            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
            <p className="member-bio">{member.bio}</p>

            <div className="skill-tags">
                {member.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                        #{skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function TeamPage() {
    return (
        <div className="team-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    함께하는 팀원들
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    최고의 결과를 만들기 위해 열정적으로 일하는 동료들을 소개합니다.
                </p>
            </div>

            {/* 팀원들에게 보여줄 현재 날씨 */}
            <div style={{ marginBottom: '3rem' }}>
                <WeatherWidget />
            </div>

            <div className="team-grid">
                {members.map((member) => (
                    <TeamCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
}