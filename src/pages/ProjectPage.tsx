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
    { id: 101, title: '인벤토리 시스템 구조 설계', part: 'Client' },
    { id: 102, title: '길드 채팅 서버 최적화', part: 'Server' },
    { id: 103, title: '메인 로비 배경 모델링', part: 'Art' },
    { id: 104, title: '전투 공식 밸런싱', part: 'Design' },
    { id: 105, title: '스킬 이펙트 셰이더 제작', part: 'Client' },
    { id: 106, title: '몬스터 AI 패턴 구현', part: 'Client' },
    { id: 107, title: '신규 던전 레벨 디자인', part: 'Design' },
    { id: 108, title: '아이템 아이콘 50종 제작', part: 'Art' },
    { id: 109, title: '로그인 인증 로직 개선', part: 'Server' },
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
                            >
                                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{task.title}</div>
                                <div className="task-assignee-mark">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee.name}`}
                                        className="tiny-avatar"
                                        alt="avatar"
                                    />
                                    <span>{task.assignee.name} ({task.assignee.role})</span>
                                </div>
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
