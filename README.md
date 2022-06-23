# 여행자 클럽 마일리지 서비스

### 개발 환경
- Node.js 16.15.1
- MySQL 8.0.29

### 필요 항목
어플리케이션 동작을 위해 다음 항목들이 설치되어야 합니다.
- Node.js
- MySQL

### 실행 방법
1. config 디렉토리에서 `db-config-sample.json` 파일을 복사 후 파일명을 `db-config.json`으로 변경합니다.  
2. `db-config.json` 파일에서 DB 접속 정보를 입력합니다.  
3. sql 폴더의 `220621_create_tables.sql` 파일을 실행해 DB를 생성합니다.  
> 필요시 `db-config.json` 파일과 sql 파일의 데이터베이스 명을 변경할 수 있습니다.

4. 터미널 실행 후 `app.js`가 있는 루트 디렉토리로 이동합니다.

5. `package.json` 파일에 명시된 의존성 패키지 설치를 위해 아래 명령어를 입력합니다.  
`npm install`

6. 어플리케이션 실행을 위해 아래 명령어를 입력합니다.  
`npm start`

위 방법으로 어플리케이션 실행 시 기본 경로는 다음과 같습니다.  
`http://localhost:3000/`

### 포인트 적립 API
`http://localhost:3000/events` url으로 POST request를 보냅니다.

### 포인트 조회 API
`http://localhost:3000/` url에서 UUID 형식의 사용자 아이디를 입력 후 검색 버튼을 누르거나,  
`http://localhost:3000/point` url으로 userId 정보를 json 타입으로 POST request를 보냅니다.
