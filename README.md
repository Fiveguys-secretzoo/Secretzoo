# SECRET ZOO (온라인 화상 블러핑 카드 게임🎮)

### 💙 SSAFY 10기 공통 프로젝트 서울 4반 🍔FIVE GUYS🍔 (2024.01.08 ~ 2024.02.16)
![secretzoo](/uploads/14475d21eaccf0ae00911153872495fc/secretzoo.jpg)

# 📓 목차

##### 1️⃣ [서비스 소개](#ⅰ-서비스-소개-)
##### 2️⃣ [서비스 화면](#ⅱ-서비스-화면)
##### 3️⃣ [팀원 소개 및 역할](#ⅲ-팀원-소개-및-역할-five-guys)
##### 4️⃣ [개발 환경](#ⅳ-개발-환경-)
##### 5️⃣ [활용 기술](#v-활용-기술-)
##### 6️⃣ [프로젝트 산출물](#vi-프로젝트-산출물-)
##### 7️⃣ [개발 회고](#vii-개발-회고-)
<br/>

# Ⅰ. 서비스 소개 🎈

### 📌 Overview
#### "놀랄 만큼 쉽고 믿기 힘들 만큼 재밌습니다."
온라인 화상 블러핑 카드 게임, Secret Zoo. <br>
화제의 보드게임, "바퀴벌레 포커"를 온라인으로 즐길 수 있다는 것을 알고 계신가요? 지금 당장 Secret Zoo에서 친구들과 플레이 해보세요!!

### 🎯 타겟
- 시간 / 공간적 제약으로 인해 오프라인으로 지인들과 함께 보드게임을 즐길 수 없는 사람들
- 아이스브레이킹과 함께 사람들끼리 친해지기 위한 방법이 필요한 사람들 (ex. 대학교 OT, 싸피데이, 심심풀이 게임)
- 웃고 떠들며 재밌게 게임하고 싶은 사람들
- 라이트하게 게임을 즐기고 싶은 모든 분들

### 📌 프로젝트 기능
- 화상 카드 게임 서비스
  - WebRTC와 카드 게임을 결합하여 실제 만난 것과 같이 게임을 플레이 할 수 있습니다.
- 게임 랭킹 서비스
  - 플레이어들을 완벽하게 속여 공격, 수비, 패스별 랭커에 도전할 수 있습니다.
- 업적 서비스
  - 게임 플레이를 통해 동물 별로 있는 숨겨진 다양한 업적을 수집해볼 수 있습니다.

### 📌 서비스 구현(✅ : 구현 완료  ❌ : 미구현)

#### 1️. 기본기능 ✅

- 회원가입 / 회원탈퇴 ✅
- 로그인 / 로그아웃 ✅
- 게임 점수 실시간 랭킹 ✅
- 게임 플레이 ✅
- 게임 업적 서비스 ✅
- 내 정보 조회 ✅
- WebRTC 활용한 실시간 화상 화면 ✅

#### 2️. 추가기능 ✅

- 소셜 로그인( 구글 / 네이버 / 카카오) ✅
- 유저 검색 및 조회 ✅
- 비회원 유저 게임 플레이✅
- 실시간 채팅 ✅
- 배경음악, 효과음 ✅

#### 3️. 심화기능 ⚠️
- 중복 로그인 방지 ✅
- 게임 후 벌칙❌
- 화면 낙서 및 음성 변조 ❌
- 친구 및 메신저 기능❌


<br/>
<br/>



# Ⅱ. 서비스 화면🎬

#### 회원가입
<div align="center">
<img src="/uploads/a94fe901b04cb99ef068c16c43a22441/회원가입.gif" alt="회원가입" width="70%" height="70%">
</div>

#### 로그인 / 로그아웃
<div align="center">
<img src="/uploads/4e8e0e8278b77290ff089f56676d89cd/로그인_로그아웃.gif" alt="로그인" width="70%" height="70%">
</div>

#### 소셜 로그인
- 구글, 네이버, 카카오 계정으로 회원가입, 로그인을 할 수 있습니다.
<div align="center">
<img src="/uploads/4bb726934215b393b420a0cfda8cce6d/소셜로그인.gif" alt="소셜로그인" width="70%" height="70%">
</div>

#### 비회원 로그인
<div align="center">
<img src="/uploads/192d735e187b8d3670f34f7d65964002/비회원로그인.gif" alt="비회원로그인" width="70%" height="70%">
</div>

#### 게임플레이
- 방 대기 화면
![image](/uploads/5cd3bb10d424b6bcacb301d5f58b39a6/image.png)

- 게임 시작
<div align="center">
<img src="/uploads/1521477e917093852bc8575b34f21cb3/게임시작.gif" alt="게임시작" width="70%" height="70%">
</div>

- 공격

  - 공격 성공
<div align="center">
<img src="/uploads/27b9adf2ff3a947a200bc1c0a7eb3f4a/공격성공.gif" alt="공격성공" width="70%" height="70%">
</div>

- 수비

  - 수비 성공
  <div align="center"><img src="/uploads/57f6cc47e352599f3a6225ed93a26aa9/수비성공.gif" alt="수비성공" width="70%" height="70%"></div>

  - 수비 실패
  <div align="center"><img src="/uploads/0bfdb06f1192d0d48f366a3112bc9e40/수비실패.gif" alt="수비실패" width="70%" height="70%"></div>

- 패스


- 게임 진행 중 다른 유저들에게 보이는 화면
  <div align="center">
<img src="/uploads/c2ca6f535556ff97e353bbfd1e557ec2/게임진행화면.gif" alt="게임진행화면" width="70%" height="70%">
</div>

#### 회원 정보
- 회원 정보, 랭킹, 업적을 확인할 수 있습니다.
<div align="center">
<img src="/uploads/beb2898118c64b0ce56ab2f14ecdf310/내정보.gif" alt="내정보" width="70%" height="70%">
</div>

#### 실시간 랭킹
- 공격, 수비, 패스별로 실시간 랭킹을 확인할 수 있습니다.
<div align="center">
<img src="/uploads/5675f0b90adb9783ed6c2e8ea940b36a/랭킹.gif" alt="랭킹" width="70%" height="70%">
</div>

#### 유저 검색 및 조회
- 유저 닉네임, 아이디로 전적 검색을 할 수 있습니다.
<div align="center">
<img src="/uploads/18b7aede7c7b340c23da122ae2887616/전적검색.gif" alt="전적검색" width="70%" height="70%">
</div>

#### 서버 점검 페이지
- 서버 점검시 미니 게임을 할 수 있습니다.
<div align="center">
<img src="/uploads/8bf7490c149bef4adedfdb23bd9779b6/서버점검페이지.gif" alt="서버점검페이지" width="70%" height="70%">
</div>

<br>
<br>


# Ⅲ. 팀원 소개 및 역할 (🍔FIVE GUYS🍔)

<div align="center">
<table>
<div> 
    <tr align="center">
        <td style="min-width: 250px;">
            <a href="https://github.com/hyeounguk2">
              <img src="https://avatars.githubusercontent.com/u/80465980?v=4" width="100">
              <br />
              <b>전형욱👑</b>
            </a> 
        </td>
     <td style="min-width: 250px;">
            <a href="https://github.com/gwanu-dev">
              <img src="https://avatars.githubusercontent.com/u/26521521?v=4" width="100">
              <br />
              <b>김관우👨🏻</b>
            </a> 
    </td>
        <td style="min-width: 250px;">
            <a href="https://github.com/kimjungkwang1">
              <img src="https://avatars.githubusercontent.com/u/134460604?v=4" width="100">
              <br />
              <b>김중광👨🏻</b>
            </a> 
        </td>
         <td style="min-width: 250px;">
            <a href="https://github.com/hyunsoo10">
              <img src="https://avatars.githubusercontent.com/u/139304756?v=4" width="100">
              <br />
              <b>조현수👨🏻</b>
            </a> 
        </td>
        <td style="min-width: 250px;">
            <a href="https://github.com/jaeyun1723">
              <img src="https://avatars.githubusercontent.com/u/84389492?v=4" width="100">
              <br />
              <b>김재윤👨🏻</b>
            </a>
        </td>
    </tr>
    <tr>
        <td>
        0️⃣ Front-end(팀장)<br> 
        1️⃣ Web-RTC(Openvidu) 전담<br>
        2️⃣ 게임 플레이 화면 구현
        <br/>
        </td>
       <td>
        0️⃣ Front-end 리더<br> 
        1️⃣ 게임 플레이 구현 및 UI<br>
        2️⃣ 소켓 서버 개발 <br>
        3️⃣ 서기 담당 <br>
        <br/>
        </td>
        <td>
        0️⃣ Front-end<br> 
        1️⃣ UI/UX 담당 <br>
        2️⃣ 메인 페이지 구현 <br>
        <br/>
        </td>
               <td>
        0️⃣ Back-end <br> 
        1️⃣ 인프라 담당<br>
        2️⃣ 게임 Ranking API 개발, QA <br>
        3️⃣ 플레이어 Rewards API 개발 <br>
        <br/>
        </td>
        <td>
        0️⃣ Back-end <br>
        1️⃣ Spring Security 담당<br>
        2️⃣ 유저 API 개발, QA <br>
        3️⃣ 소셜 로그인(구글, 네이버, 카카오) <br>
        <br/>
        </td>
    </tr>
</div>
</table>
</div>

<br/>
<br/>


# Ⅳ. 개발 환경 🖥 
## 🖱 Frontend
<img src="https://img.shields.io/badge/JavaScript(es6)-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black">
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white) <br/>
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/openvidu-624f00?style=for-the-badge">
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">
<br/>
![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
<img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/Lottie-00c1a2?style=for-the-badge">
<img src="https://img.shields.io/badge/flowbite-1b61ea?style=for-the-badge">

#### 상세스택

    react 18.2.0,
    redux 5.0.1
    redux-persist 6.0.0
    flowbite-react 0.7.2
    tailwindcss 3.4.1
    socket.io 4.7.4
    openvidu-browser 2.29.1
<br>

## 🖱 Backend
<img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white"> 
![Intellij IDEA](https://img.shields.io/badge/Intellij%20IDEA-000000.svg?&style=for-the-badge&logo=IntelliJ%20IDEA&logoColor=white) <br/>
<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
<img src="https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white"> 
<img src="https://img.shields.io/badge/Spring Security-6DB33F.svg?style=for-the-badge&logo=Spring Security&logoColor=white">
<br>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white">
<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white"> 

#### 상세 스택
    spring boot 3.2.1
    spring-boot-starter-data-jpa
    spring security 6.2.1
    lombok 1.18.30
    azul-17
    mysql 5.7.43
    redis 7.0.4
    swagger3
    gradle
<br/>

## 🖱 CI/CD
<img src="https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">
![EC2](https://img.shields.io/badge/EC2-232F3E?style=for-the-badge&logo=Amazon-ec2&logoColor=white)

#### 상세 스택
    docker 25.0.1
    docker-compose 2.21.0
    jenkins LTS 2.401.1
 
<br>

## 🎨 UI/UX
<img src="https://img.shields.io/badge/Figma-F24E1E.svg?style=for-the-badge&logo=Figma&logoColor=white">
<br>
 
## 👨‍👩‍👧 협업 툴
- <strong>형상 관리<br>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white">

- <strong>이슈 관리<br>
  <img src="https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white">

- <strong>커뮤니케이션<br>
  ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
  ![Mattermost](https://img.shields.io/badge/Mattermost-0072C6?style=for-the-badge&logo=mattermost&logoColor=white)
<br>


</div>

<br>
<br>

# V. 활용 기술 🧰
## 1. WebRTC(OpenVidu)
## 2. Spring Security와 JWT
서비스 회원가입, 로그인을 Spring Security와 JWT를 활용하여 구현하였습니다. Spring Security Oauth2.0을 통해 소셜 로그인(구글/네이버/카카오)을 백엔드에서 구현하였고, JWT를 사용하기 위해 Security Stateless 세션 정책을 사용하였습니다. 그러다보니 중복 로그인을 직접 막아야하는 문제가 발생하였습니다. 해당 서비스가 게임이라는 특성상 중복 로그인 방지는 필수 요소이므로 저희는 JWT 토큰을 통해 중복 로그인을 방지하였습니다. 프론트엔드에서는 세션 스토리지를 사용하였고, 백엔드에서는 Redis를 이용해 엑세스 토큰 블랙리스트를 생성하여 비정상적인 접근의 엑세스 토큰을 저장하여 관리하였습니다.
## 3. Web Socket
Socket.io 를 이용하여 웹 소켓 서버를 생성하여 클라이언트의 플레이 정보와 진행 상황 등을 관리하고 게임 플레이의 로직들을 전반적으로 담당하였습니다. Node.js, Express 서버를 통하여 구현하였으며, 클라이언트 방 접속 시 유저로부터 정보를 받아 미리 만들어둔 자료구조에 저장하며 클라이언트에서는 정보 변경 없이 웹 소켓 서버로 부터 정보를 받아 보여주는 형식을 취해 게임의 정보에 대한 변조를 방지했습니다. 각각의 소켓 서버 메시지를 구성하여 게임 플레이 진행에 알맞는 메시지를 클라이언트와 주고 받아 게임의 진행 도중 새로고침을 하여도 바로 플레이에 다시 참가할 수 있습니다.
## 4. Redux
redux toolkit 을 사용하여 유저의 정보를 관리하고 토큰을 포함하는 api 요청을 관리 하였습니다. 유저 정보를 여러 컴포넌트에서 사용하고 있었기 때문에 상태 업데이트의 동기화를 위해 redux 를 통한 관리가 필요했습니다. 그래서 리덕스를 통해 유저정보를 관리하여 컴포넌트별 유저 정보의 일관성을 유지하였습니다.헤더에 jwt 토큰을 담아야하는 요청들이 많았고 그러한 요청들은 토큰의 만료시간에 따라 재발급 받거나, 중복로그인을 사전에 확인 하는 작업이 필요했습니다.jwt토큰을 요하는 요청들을 redux에서 관리하고 axios 인터셉터를 통해 간소화 하였습니다.

<br>
<br>

# VI. 프로젝트 산출물 📁

## 🏛 서비스 아키택처
![image](/uploads/ee576768f31c04b65d1cbacebb100f41/image.png)

## 🛢︎ ERD
![image](/uploads/5f49919c14d5cef40949c7ed37334cae/image.png)

## 📄 요구사항 정의서
![1](/uploads/947c0a3ef77b0b06fbba7cbaecf07cc0/1.PNG)
![2](/uploads/c20752e880975cb43a55e34f2c4214f8/2.PNG)
## 📄 API 명세서
![image](/uploads/d5ab45172ef5b9cf5411291f0bebb251/image.png)

## 🎨 화면 설계서
![image](/uploads/0c3b956fa23a6f5c2c48e2d294d4d32a/image.png)


<br>



# VII. 개발 회고 🔎

### 🔲개발 컨벤션

#### ❗Commit Message Rule

```
 [커밋 타입]: [작업내용]
❕feat : 새로운 기능 추가

❕fix : 버그 수정

❕docs : 문서 수정

❕style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

❕refactor : 코드 리펙토링

❕test : 테스트 코드, 리펙토링 테스트 코드 추가

❕chore : 빌드 업무 수정, 패키지 매니저 수정

❕comment : 필요한 주석 추가 했을 경우

❕design : css나 디자인 변경, 이미지 추가 등
```

#### ❗Merge Request Rule
```
# 제목 
[S10P12A406-1] 기능 이름

## 개요
<!---- 변경 사항 및 관련 이슈에 대해 간단하게 작성해주세요. 어떻게보다 무엇을 왜 수정했는지 설명해주세요. -->
<!---- Resolves: #(Isuue Number) -->
## PR 유형
어떤 변경 사항이 있나요?

- [x] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 테스트 추가, 테스트 리팩토링
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

## PR Checklist
PR이 다음 요구 사항을 충족하는지 확인하세요.

- [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다.  Commit message convention 참고  (Ctrl + 클릭하세요.) 
- [ ] 변경 사항에 대한 테스트를 했습니다.(버그 수정/기능에 대한 테스트).
```

## 💬 개발 회고

### **👤 전형욱**<br>

### **👤 조현수**<br>
- 인프라 담당 예정이었던 팀원의 갑작스러운 부재로, 인프라를 담당하게 되었는데
인프라 경험이 없었기 때문에 처음에 어려움을 많이 겪었지만, 처음 부터 지식을 차곡차곡 쌓아가는 것이 재밌었습니다.
아직 완벽한 인프라 구성을 했다고 말할 순 없지만, 컨설턴트님께서 조언해주신 "성에는 대문을 하나만 열어두어라"는 말씀을 마음에
새기며 우리의 EC2 라는 큰 성에 외부 접근을 한 곳으로만 열어두는 방향으로 인프라를 구축하는 데 힘썼습니다.
SSL 인증서 적용, Nginx 리버스 프록시, Jenkins와 Gitlab을 이용한 CI/CD 구축 그리고 도커를 이용한 컨테이너 기술의 활용 등
새롭게 알게된 지식들이 많은 것 같아 얻어가는 것이 많은 프로젝트였다고 생각합니다.
또한, 평소에 경험해보지 못했던, 랭킹과 플레이어 업적 서비스 등을 개발하면서 고민할 부분도 많았고, 해당 고민거리를 해결해 가는 과정도
매우 재밌었습니다. 실시간 랭킹을 위한 레디스 DB 활용, 동점자 처리를 위한 우선순위큐 자료구조의 활용 등 새로운 고민과 배움을 즐길 수 있었습니다.
팀원들이 각자 맡은 부분을 최선을 다해서 열심히 해주어서 고마웠으며, 또 도움이 필요할 때면 업무를 분담해서 같이 해결해나가는 과정 덕분에
더욱 완성도 있는 프로젝트를 만들 수 있었던 것 같습니다.
주제가 게임인 만큼, 프로젝트를 만들어 가는 과정이 재밌었고, 더 몰입해서 즐겁게 할 수 있었다고 생각합니다.
이번에 구현하지 못한 기능들이 아쉽지만, 이런 아쉬움들을 잘 새겨서 다음에 더 완성도 있는 프로젝트를 만드는 밑거름으로 활용하고 싶습니다.

### **👤 김재윤** <br>
- 처음 쓰는 기술 스택들을 이것 저것 써보며 많이 성장할 수 있는 기회였습니다. 팀원들과 힘든 것보다 매일 매일 웃으며 즐겁게 코딩했던 것 같습니다. 또한, git과 jira를 통해 효율적인 일정 관리와 협업을 할 수 있어서 좋았습니다. 개발자로서 한 명의 팀원으로서 배울 점이 많았던 프로젝트 경험이었습니다. 팀원들 모두 너무 고생했고 감사하다는 말을 전하고 싶습니다.

### **👤 김관우**<br>
- socket.io 를 이용하기 위해 서버와 클라이언트를 동시에 개발하면서 자신의 부족함을 많이 깨닳게 되었습니다. 복잡한 로직을 개발하며 계획적이고 체계적인 구조가 먼저 잡혀있어야 개발 시에도 다시 반복하여 코딩하는 일 없이 순탄하게 개발을 할 수 있다라는 점을 절실히 알게 되는 프로젝트였습니다. redux를 사용하며 상태를 저장하고 가져오는 과정에서의 동기화 문제가 많이 발생하여 이에 많은 어려움을 겪기도 하였습니다. 지금까지 진행한 프로젝트는 단순한 협업을 통해 진행했지만 이번 프로젝트는 JIRA와 Gitlab을 이용하여 더 체계적인 협업을 경험할 수 있어서 좋았습니다. 또 좋은 팀원들을 만나 혼자서는 느껴볼 수 없는 협업이라는 중요한 가치를 알게 되었습니다. 개발은 혼자가 아니라 함께 하는 것임을 알게되었습니다. 제 자신의 실력 향상 뿐만 아니라 가치관에도 크나큰 발전을 가져다 준 프로젝트였습니다.

### **👤 김중광**<br>
- 이번 프로젝트는 여러 사람과 함께하는 첫 경험이었기에 처음에는 다소 낯설었습니다. 하지만 훌륭한 팀원들과의 협력을 통해 많은 것을 배우고 성장할 수 있었던 소중한 기회였습니다.
프로젝트를 진행하며 처음으로 React를 사용해 보았습니다. 특히 랭킹, 업적, 로그인 기능의 화면을 구현하는 과정에서 다양한 라이브러리를 활용하였습니다. 이러한 경험은 새로운 기술 스택을 빠르게 익히고 적용하는 능력을 키우는 데 큰 도움이 되었습니다.
그럼에도 불구하고, React에 대한 이해가 완벽하지 않았다는 점은 아쉬움으로 남습니다. 때로는 기능 구현에 있어 예상치 못한 어려움에 부딪히기도 했습니다. 또한 초기 기획한 기능을 모두 구현하지 못햇다는 아쉬움이 남았습니다.
다음 프로 젝트에서는 이러한 아쉬움을 개선하여 앞으로의 프로젝트에서 더 나은 성과를 낼 수 있도록 노력할 것입니다.
