# 카페 카르테 | Cafe Carte

본 리포지토리는 [에스에이엠지엔터테인먼트](https://samg.net)의 브랜드인 [트윌릿 스튜디오](https://x.com/Twillit_studio_) 소속 3D 버추얼 그룹 카페 카르테(Cafe Carte)의 비공식 팬 웹사이트 프로젝트입니다.

## 설치

1. 프로젝트를 클론합니다.

   ```bash
   git clone https://github.com/HaeengIn/cafe-carte.git
   ```

2. 프로젝트 의존성을 설치합니다.
   ```bash
   npm ci
   ```

## 로컬 서버 실행

본 프로젝트는 Next.js 프로젝트로, npm을 이용하여 로컬 서버를 실행합니다.

- 프로덕션 서버 실행

  ```bash
  npm run build && npm run start
  ```

- 개발 서버 실행
  ```bash
  npm run dev
  ```

프로덕션 서버는 실제 배포 환경에서 사용하며, 로컬 개발 시에는 개발 서버를 실행해주세요.

## 주의사항

- 본 프로젝트는 [deprecated 폴더](./deprecated/) 내에 Next.js로 이전하기 전에 제작한 파일들이 있습니다.

  **기존 파일의 보존을 위해 해당 폴더를 삭제하지 마세요.**

- TypeScript는 `7.0.2` 버전 이상을 사용해야 하며, IDE에서도 해당 버전을 사용해주세요.

- 코드 린터로 ESLint `9.39.5` 버전을 사용해주세요.

- 코드 포맷터로 Prettier를 사용하며, 들여쓰기 간격은 공백 2칸으로 설정해주세요.

## 라이센스

본 프로젝트의 소스 코드 및 자체 제작 콘텐츠에는 기본적으로 **CC BY-NC-SA 4.0** 라이선스가 적용됩니다.

단, 프로젝트에서 사용되는 이미지 등의 정적 파일 중 일부는 별도의 저작권자가 존재하며, 해당 파일에는 본 라이선스가 적용되지 않을 수 있습니다.

## 문의

본 프로젝트에 대해 궁금한 점이나 도움이 필요하다면 새로운 [Issue](https://github.com/HaeengIn/cafe-carte/issues)를 만들거나 [haeengin@gmail.com](mailto:haeengin@gmail.com)으로 메일을 보내주시기 바랍니다.

### 새로운 Issue를 만들 때

새로운 Issue를 만들 때 아래의 사항들을 모두 지켜주시기 바랍니다.

- 라벨 지정: Issue의 성격에 맞는 라벨을 지정해주세요.
- 유형 지정: Bug, Feature 등의 적절한 Issue 유형을 선택해주세요.
