FROM openjdk:17-alpine

#build된 jar 파일
ARG JAR_FILE_PATH=build/libs

# 호스트의 JAR 파일을 컨테이너로 복사
COPY ${JAR_FILE_PATH}/game-0.0.1-SNAPSHOT.jar myboot.jar

# 실행시 사용할 환경 변수 설정 (예: 프로파일 설정)
# ENV SPRING_PROFILES_ACTIVE=dev,oauth

ENTRYPOINT ["java", "-jar", "./myboot.jar"]
