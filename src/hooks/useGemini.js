import { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

/**
 * useGemini Custom Hook
 * 
 * 구글의 Gemini AI API를 쉽게 사용하기 위해 만든 '커스텀 훅'입니다.
 * 이 훅을 사용하면 어떤 컴포넌트에서든 AI 호출 로직을 재사용할 수 있습니다.
 */
const useGemini = () => {
    // 1. 상태 관리 (Loading, Error, Response)
    // - loading: API 요청 중인지 여부 (true면 로딩 중)
    // - error: 에러 발생 시 에러 메시지 저장
    // - response: AI가 생성한 텍스트 결과 저장
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState('');

    /**
     * generateContent 함수
     * 
     * 실제로 API를 호출하는 비동기 함수입니다.
     * @param {string} prompt - AI에게 보낼 명령어 (예: "이 글 요약해줘: ...")
     * @param {string} model - 사용할 모델명 (기본값: gemini-3-flash-preview)
     */
    const generateContent = async (prompt, model = "gemini-3-flash-preview") => {
        // 2. API Key 가져오기
        // .env 파일에 저장된 VITE_GEMINI_KEY를 가져옵니다.
        const apiKey = import.meta.env.VITE_GEMINI_KEY;

        // 키가 없으면 에러 설정 후 중단
        if (!apiKey) {
            setError("API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.");
            return null;
        }

        // 3. 호출 전 상태 초기화
        setLoading(true); // 로딩 시작
        setError(null);   // 이전 에러 초기화
        setResponse('');  // 이전 결과 초기화

        try {
            // 4. GoogleGenAI 클라이언트 초기화
            // 여기서 API Key를 사용하여 SDK 인스턴스를 만듭니다.
            const ai = new GoogleGenAI({ apiKey });

            // 5. API 요청 전송
            // models.generateContent 메서드로 AI에게 답변을 요청합니다.
            const result = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });

            // 6. 응답 데이터 처리
            // SDK 버전에 따라 응답 형식이 다를 수 있어 유연하게 처리합니다.
            let text = "";
            if (typeof result.text === 'string') {
                text = result.text; // 문자열 프로퍼티인 경우
            } else if (typeof result.text === 'function') {
                text = result.text(); // 함수인 경우 실행해서 가져옴
            } else {
                text = JSON.stringify(result); // 알 수 없는 형식이면 JSON 문자열로 변환
            }

            // 7. 성공 결과 저장
            setResponse(text);
            return text;

        } catch (err) {
            // 8. 에러 처리
            console.error("Gemini Hook Error:", err);
            const errMsg = err.message || "AI 응답을 가져오는 중 오류가 발생했습니다.";
            setError(errMsg); // 에러 상태 업데이트
            return null;

        } finally {
            // 9. 로딩 종료
            // 성공하든 실패하든 로딩 상태는 false로 변경
            setLoading(false);
        }
    };

    // 10. 훅이 반환하는 값
    // 컴포넌트에서 이 값들을 구조 분해 할당({ generateContent, ... })해서 사용합니다.
    return { generateContent, response, loading, error };
};

export default useGemini;
