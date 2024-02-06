# 기반 이미지 설정
FROM node:20

# 앱 디렉터리 생성
WORKDIR /usr/src/app/client

# 앱 종속성 설치
COPY package.json ./

RUN npm install

# 앱 소스 추가
COPY . .

# 실행 파일에 대한 실행 권한을 부여합니다.
# RUN chmod +x node_modules/.bin/react-scripts
RUN chmod +x node_modules/.bin/*

# 앱 빌드
RUN npm run build

# 앱 실행
CMD ["npm", "start"]

