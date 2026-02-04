import { useState } from 'react';
import './ProjectPage.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// 데이터 인터페이스 정의
interface Worker {
    id: number;
    name: string;
    role: string;
}

interface PendingTask {
    id: number;
    title: string;
    part: 'Client' | 'Server' | 'Art' | 'Design';
}

interface ActiveTask {
    id: number;
    title: string;
    tag: string;
    assignee: Worker; // 작업자 객체 포함
    status: 'ToDo' | 'InProgress' | 'Done';
}

// 초기 데이터
const workers: Worker[] = [
    { id: 1, name: '강민혁', role: 'PD' },
    { id: 2, name: '김철수', role: 'Client' },
    { id: 3, name: '이영희', role: 'Server' },
    { id: 4, name: '정블라', role: 'Engine' },
    { id: 5, name: '박민수', role: 'Art' },
    { id: 6, name: '최동욱', role: 'TA' },
    { id: 7, name: '송지아', role: 'Modeler' },
    { id: 8, name: '류호성', role: 'Anim' },
    { id: 9, name: '한유리', role: 'UI' },
    { id: 10, name: '조현우', role: 'Design' },
    { id: 11, name: '임소희', role: 'Level' },
    { id: 12, name: '오세윤', role: 'Sound' },
];

const initialPendingTasks: PendingTask[] = [
    // Client Part (25 tasks)
    { id: 101, title: '인벤토리 시스템 구조 설계', part: 'Client' },
    { id: 102, title: '스킬 이펙트 셰이더 제작', part: 'Client' },
    { id: 103, title: '몬스터 AI 패턴 구현', part: 'Client' },
    { id: 104, title: '던전 입장 UI 연동', part: 'Client' },
    { id: 105, title: '캐릭터 이동 동기화 로직', part: 'Client' },
    { id: 106, title: '클라이언트 메모리 최적화', part: 'Client' },
    { id: 107, title: '전투 타격감 개선', part: 'Client' },
    { id: 108, title: '퀘스트 시스템 클라이언트 구현', part: 'Client' },
    { id: 109, title: 'NPC 대화 시스템 개발', part: 'Client' },
    { id: 110, title: '월드맵 네비게이션 기능', part: 'Client' },
    { id: 111, title: '장비 강화 연출 구현', part: 'Client' },
    { id: 112, title: '채팅 시스템 UI 개발', part: 'Client' },
    { id: 113, title: '레이드 보스 패턴 스크립팅', part: 'Client' },
    { id: 114, title: '모바일 터치 조작감 개선', part: 'Client' },
    { id: 115, title: '컷신 재생 시스템 구현', part: 'Client' },

    // Server Part (20 tasks)
    { id: 201, title: '길드 채팅 서버 최적화', part: 'Server' },
    { id: 202, title: '로그인 인증 로직 개선', part: 'Server' },
    { id: 203, title: '데이터베이스 샤딩 설계', part: 'Server' },
    { id: 204, title: '실시간 위치 동기화 서버', part: 'Server' },
    { id: 205, title: '아이템 드랍 확률 테이블 검증', part: 'Server' },
    { id: 206, title: '서버 부하 테스트 도구 제작', part: 'Server' },
    { id: 207, title: '매치메이킹 알고리즘 고도화', part: 'Server' },
    { id: 208, title: '해킹 방지 보안 모듈 적용', part: 'Server' },
    { id: 209, title: '글로벌 서비스 리전 분리', part: 'Server' },
    { id: 210, title: '결제 시스템 연동 API', part: 'Server' },

    // Art Part (20 tasks)
    { id: 301, title: '메인 로비 배경 모델링', part: 'Art' },
    { id: 302, title: '아이템 아이콘 50종 제작', part: 'Art' },
    { id: 303, title: '주인공 캐릭터 3D 모델링', part: 'Art' },
    { id: 304, title: '몬스터 애니메이션 작업', part: 'Art' },
    { id: 305, title: '스킬 폭발 이펙트 리소스', part: 'Art' },
    { id: 306, title: 'UI 버튼 및 프레임 디자인', part: 'Art' },
    { id: 307, title: '던전 텍스처 맵핑', part: 'Art' },
    { id: 308, title: '홍보용 일러스트 제작', part: 'Art' },
    { id: 309, title: '장비 아이템 3D 모델링', part: 'Art' },
    { id: 310, title: 'NPC 원화 시트 작업', part: 'Art' },

    // Design Part (15 tasks)
    { id: 401, title: '전투 공식 밸런싱', part: 'Design' },
    { id: 402, title: '신규 던전 레벨 디자인', part: 'Design' },
    { id: 403, title: '캐릭터 스킬 기획서 작성', part: 'Design' },
    { id: 404, title: '유료화 모델(BM) 설계', part: 'Design' },
    { id: 405, title: '튜토리얼 시나리오 작성', part: 'Design' },
    { id: 406, title: '업적 시스템 기획', part: 'Design' },
    { id: 407, title: '이벤트 보상 테이블 구성', part: 'Design' },
    { id: 408, title: '길드전 규칙 정의', part: 'Design' },
];

export default function ProjectPage() {
    const { ref, isVisible } = useScrollAnimation();

    const [pendingTasks, setPendingTasks] = useState<PendingTask[]>(initialPendingTasks);
    const [activeTasks, setActiveTasks] = useState<ActiveTask[]>([]);

    // 드래그 상태 관리
    const [draggedWorker, setDraggedWorker] = useState<Worker | null>(null);
    const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);

    // 1. 작업자 드래그 시작 (Zone 1 -> Zone 2)
    const handleWorkerDragStart = (worker: Worker) => {
        setDraggedWorker(worker);
    };

    // 2. 업무 계획 위에 드롭 (Zone 2)
    const handleMergeDrop = (task: PendingTask) => {
        if (!draggedWorker) return;

        // 대기열에서 제거
        setPendingTasks(prev => prev.filter(t => t.id !== task.id));

        // 활성 작업으로 추가 (Merge)
        const newActiveTask: ActiveTask = {
            id: task.id,
            title: task.title,
            tag: task.part,
            assignee: draggedWorker,
            status: 'ToDo'
        };

        setActiveTasks(prev => [...prev, newActiveTask]);
        setDraggedWorker(null);
    };

    // 3. 활성 작업 드래그 시작 (Zone 3 내부 이동)
    const handleTaskDragStart = (taskId: number) => {
        setDraggedTaskId(taskId);
    };

    // 4. 칸반 컬럼에 드롭 (Zone 3)
    const handleKanbanDrop = (status: ActiveTask['status']) => {
        if (draggedTaskId === null) return;

        setActiveTasks(prev => prev.map(t =>
            t.id === draggedTaskId ? { ...t, status } : t
        ));
        setDraggedTaskId(null);
    };

    // 5. 작업 삭제 핸들러 (추가됨)
    const handleDeleteTask = (e: React.MouseEvent, taskId: number) => {
        e.stopPropagation(); // 드래그 이벤트 전파 방지
        if (confirm('정말 이 작업을 삭제하시겠습니까? (다시 대기열로 돌아가지 않습니다)')) {
            setActiveTasks(prev => prev.filter(t => t.id !== taskId));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div
            className="project-container"
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
        >
            {/* HEADER */}
            <div>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                    프로젝트 대시보드
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                    작업자를 업무 목록으로 드래그하여 일을 배정하세요.
                </p>
            </div>

            {/* ZONE 1: WORKERS */}
            <div className="worker-zone">
                <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>👥 작업자 대기소 (Drag Me!)</div>
                <div className="worker-list">
                    {workers.map(worker => (
                        <div
                            key={worker.id}
                            className="worker-avatar"
                            draggable
                            onDragStart={() => handleWorkerDragStart(worker)}
                        >
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.name}`}
                                alt={worker.name}
                                className="worker-img"
                            />
                            <span className="worker-name">{worker.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ZONE 2: PENDING TASKS (DROP ZONE) */}
            <div className="backlog-zone">
                {['Client', 'Server', 'Art', 'Design'].map(part => (
                    <div key={part} className="backlog-column">
                        <div className="part-header">
                            <span>{part === 'Art' || part === 'Design' ? '🎨' : '💻'}</span>
                            {part} Part
                        </div>
                        <div className="pending-task-list">
                            {pendingTasks.filter(t => t.part === part).map(task => (
                                <div
                                    key={task.id}
                                    className="pending-task-card"
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleMergeDrop(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                            {pendingTasks.filter(t => t.part === part).length === 0 && (
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
                                    할 일 없음
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ZONE 3: KANBAN BOARD */}
            <div className="kanban-zone">
                {(['ToDo', 'InProgress', 'Done'] as const).map(status => (
                    <div
                        key={status}
                        className="kanban-column-active"
                        onDragOver={handleDragOver}
                        onDrop={() => handleKanbanDrop(status)}
                    >
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                            {status === 'ToDo' ? '📌 할 일' : status === 'InProgress' ? '🔥 진행 중' : '✅ 완료'}
                            <span style={{ marginLeft: '0.5rem', opacity: 0.5, fontSize: '0.9rem' }}>
                                {activeTasks.filter(t => t.status === status).length}
                            </span>
                        </div>

                        {activeTasks.filter(t => t.status === status).map(task => (
                            <div
                                key={task.id}
                                className="task-card-active"
                                draggable
                                onDragStart={() => handleTaskDragStart(task.id)}
                                style={{ position: 'relative' }}
                            >
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', paddingRight: '1rem' }}>{task.title}</div>
                                <div className="task-assignee-mark">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee.name}`}
                                        className="tiny-avatar"
                                        alt="avatar"
                                    />
                                    <span>{task.assignee.name} ({task.assignee.role})</span>
                                </div>
                                <button
                                    onClick={(e) => handleDeleteTask(e, task.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        opacity: 0.3,
                                        transition: 'opacity 0.2s',
                                        color: 'var(--text-secondary)'
                                    }}
                                    title="삭제"
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        {activeTasks.filter(t => t.status === status).length === 0 && (
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', marginTop: '2rem' }}>
                                (비어있음)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
