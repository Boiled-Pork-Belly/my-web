# React + TypeScript + Vite

이 템플릿은 React, Vite, HMR(Hot Module Replacement), 그리고 ESLint가 설정된 최소한의 개발 환경을 제공합니다.

현재 두 가지 공식 플러그인을 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react): [Babel](https://babeljs.io/)을 사용하여 Fast Refresh를 지원합니다.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc): [SWC](https://swc.rs/)를 사용하여 Fast Refresh를 지원합니다.

## React Compiler

React Compiler는 현재 SWC와 호환되지 않습니다. 진행 상황은 [이 이슈](https://github.com/vitejs/vite-plugin-react/issues/428)에서 확인할 수 있습니다.

## ESLint 설정 확장하기

프로덕션 레벨의 애플리케이션을 개발한다면 타입 인식(type-aware) 린트 규칙을 활성화하는 것을 권장합니다:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 설정들...

      // tseslint.configs.recommended 대신 아래 설정을 사용하세요
      tseslint.configs.recommendedTypeChecked,
      // 혹은 더 엄격한 규칙을 원한다면:
      tseslint.configs.strictTypeChecked,
      // 스타일 관련 규칙을 원한다면:
      tseslint.configs.stylisticTypeChecked,

      // 다른 설정들...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```

React 전용 린트 규칙을 위해 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 와 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)을 설치할 수도 있습니다:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 다른 설정들...
      // React 린트 규칙 활성화
      reactX.configs['recommended-typescript'],
      // React DOM 린트 규칙 활성화
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 기타 옵션...
    },
  },
])
```
