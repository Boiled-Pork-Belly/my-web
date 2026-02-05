// src/pages/WeatherPage.tsx
// 날씨 전용 페이지
// 역할: WeatherWidget을 포함한 상세 날씨 정보 페이지

import WeatherWidget from '../components/WeatherWidget';
import './WeatherPage.css';

export default function WeatherPage() {
    return (
        <div className="weather-page">
            {/* 페이지 헤더 */}
            <div className="weather-page-header">
                <h2>📊 상세 날씨 예보실</h2>
                <p>서울 지역의 실시간 기상 정보를 확인하세요.</p>
            </div>

            {/* 위젯 배치 - 레고 블록처럼 그냥 붙이면 끝! */}
            <WeatherWidget />

            {/* 추가 설명 */}
            <div className="weather-info">
                <h3>ℹ️ API 정보</h3>
                <p>
                    이 데이터는 <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> 무료 API를 사용합니다.
                </p>
                <ul>
                    <li>📍 위치: 서울 (위도 37.5, 경도 126.9)</li>
                    <li>🔄 새로고침 버튼을 눌러 최신 데이터를 받아오세요</li>
                    <li>⏰ 시간별 기온은 오늘 하루의 예보입니다</li>
                </ul>
            </div>
        </div>
    );
}
