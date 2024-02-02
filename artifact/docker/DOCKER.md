# Docker Guide

## Dockerfile

#### Spring boot 프로젝트 이미지 생성

### STEP1

```Gradle -> Task -> boot.jar 실행```
<img src = "img/jar.png"/>


### STEP2
```build -> libs -> jar 파일 생성```
<img src = "img/jar2.png"/>

### [참고]
application.yml 예시

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/fiveguys?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: root
    password: ssafy


  jpa:
    open-in-view: true
    hibernate:
      ddl-auto: update
      naming:
        physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
      use-new-id-generator-mappings: false
    show-sql: true
    properties:
      hibernate.format_sql: true
      dialect: org.hibernate.dialect.MySQL8Dialect


logging:
  level:
    org.hibernate.SQL: debug
```

### STEP3
Dockerfile 생성

```docker
FROM openjdk:17-alpine
ARG JAR_FILE=game-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} myboot.jar
ENTRYPOINT ["java", "-jar", "/myboot.jar"]
```

**FROM :** 이미지를 생성할 때 사용할 기반 이미지 레이어

**ARG :** 변수 선언

**COPY :** 실행할 jar파일을 도커 컨테이너 내부에 myboot.jar라는 이름으로 복사합니다. 상대 경로로 위치도 같이 설정 가능

**ENTRYPOINT :** 컨테이너가 시작될 때 실행할 스크립트 혹은 명령 정의

#### [참고] 이미지 빌드
```shell
docker build -t [이미지 이름] [Dockerfile 스크립트 파일 경로]
docker build -t springbootapp01 C:\Users\hyuns\docker-image
```


## 2. Docker-compose

spring boot 서버가 mysql 서버에 의존하고 있을 때 두 이미지를 함께 생성하고 실행 시킬 수 있는 docker-compose 파일을 작성한다


### 🔔Spring boot + Mysql 
#### docker-compose.yml

```yaml

version: '3'

services:
  mysql001:
    image: mysql:8.0
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: ssafy
      MYSQL_DATABASE: fiveguys
      MYSQL_ROOT_HOST: '%'
      MYSQL_USER: ssafy
      MYSQL_PASSWORD: ssafy
      TZ: 'Asia/Seoul'
    ports:
      - "3307:3306"

  spring-boot-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8081:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql001:3306/fiveguys?autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&useLegacyDatetimeCode=false
      SPRING_DATASOURCE_USERNAME: "root"
      SPRING_DATASOURCE_PASSWORD: "ssafy"
    depends_on:
      - mysql001

```
### 🎈 Spring boot + Mysql + Redis
#### docker-compose.yml
```yaml
version: '3'

services:
  mysql:
    image: mysql:8.2
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: ssafy
      MYSQL_DATABASE: rank_db
      MYSQL_ROOT_HOST: '%'
      MYSQL_USER: ssafy
      MYSQL_PASSWORD: ssafy
      TZ: 'Asia/Seoul'
    ports:
      - "3307:3306"

  redis:
    image: redis:latest
    container_name: redis
    hostname: redis
    ports:
      - 6379:6379
    extra_hosts:
      - host.docker.internal:host-gateway

  spring-app:
    container_name: spring-app
    build:
      context: .
      dockerfile: Dockerfile.spring
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/rank_db?autoReconnect=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&useLegacyDatetimeCode=false
      SPRING_DATASOURCE_USERNAME: "root"
      SPRING_DATASOURCE_PASSWORD: "ssafy"
      SPRING_REDIS_HOST: redis
      SPRING_REDIS_PORT: 6379
    depends_on:
      - mysql
      - redis

```

Dockerfile.mysql
```Docker
FROM mysql:latest

# 환경 변수 설정 (예: 데이터베이스 이름, 사용자, 비밀번호)
ENV MYSQL_DATABASE=rank_db \
    MYSQL_USER=ssafy \
    MYSQL_PASSWORD=ssafy \
    MYSQL_ROOT_PASSWORD=ssafy

# 포트 설정 (기본 MySQL 포트는 3306)
EXPOSE 3306
```

Dockerfile.redis
```Docker
# Redis base image
FROM redis:latest

# Expose the default Redis port
EXPOSE 6379

# Set a custom configuration if needed
# COPY redis.conf /etc/redis/redis.conf
# CMD ["redis-server", "/etc/redis/redis.conf"]

```

Dockerfile.spring

```Docker
FROM openjdk:17-alpine
ARG JAR_FILE=game-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} myboot.jar
ENTRYPOINT ["java", "-jar", "/myboot.jar"]
```


#### docker compose up
컴포즈 파일의 내용에 따라 컨테이너와 볼륨, 네트워크가 생성되고 실행된다.
```shell
docker-compose -f [정의 파일 경로] up [옵션]
docker-compose -f C:\Users\hyuns\docker\com_folder\docker-compose.yml up -d
```




## React Docker

### STEP1
react root폴더 위치에 Dockerfile 작성

```Docker
# 기반 이미지 설정
FROM node:16

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 종속성 설치
COPY package*.json ./

RUN npm install

# 앱 소스 추가
COPY . .

# 앱 빌드
RUN npm run build

# 앱 실행
CMD ["npm", "start"]

```


### STEP2

Dockerfile로 이미지 생성
(Dockerfile이 위치한 디렉터리에서 명령어를 실행할 경우)
```bash
docker build -t my-react-app .
```

### STEP3
도커 컨테이너 실행(바인트 마운트)
```bash
docker run --name react-container -d -p 3001:3000 -v C:/Users/hyns/docker/react_test/my-app:/usr/src/app my-react-app
```


