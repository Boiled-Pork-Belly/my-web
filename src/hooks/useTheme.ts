import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    // 1. 초기 상태 설정 (localStorage 확인 또는 시스템 설정 확인)
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) return savedTheme;

        // 저장된 설정이 없으면 시스템 다크모드 확인
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    // 2. 테마 변경 시 HTML 속성 업데이트 및 localStorage 저장
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // 3. 토글 함수
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}
