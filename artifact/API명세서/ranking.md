# [랭킹/업적 서비스]

### ⚠️공통 예외 처리 응답

**Response**

40X :

```json
{
	"statusCode" : 40X
	"message" : "잘못된 요청입니다. 다시 한번 시도해주세요."
}
```

50X:

```json
{
	"statusCode" : 50X
	"message" : "서버에 문제가 발생했습니다. 문제가 계속 되면 고객센터로 연락부탁드립니다"
}
```

## 📄[랭킹 정보 조회]

### 📄TOP 10 공격 점수 랭킹 조회

**Request URL :** [GET]  /rank/attack

**권한** : 로그인 한 사용자

**Response:**

200 : 성공

```json

{
	"count":10,
	"data":
		[
			{"playerId":"player1@ssafy.com", "attackScore":520.0},
			{"playerId":"player2@ssafy.com", "attackScore":420.0},
			{"playerId":"player3@ssafy.com", "attackScore":320.0},
			{"playerId":"player4@ssafy.com", "attackScore":120.0},
			{"playerId":"player5@ssafy.com", "attackScore":110.0},
			{"playerId":"player6@ssafy.com", "attackScore":100.0},
			{"playerId":"player7@ssafy.com", "attackScore":90.0},
			{"playerId":"player8@ssafy.com", "attackScore":70.0},
			{"playerId":"player9@ssafy.com", "attackScore":60.0},
			{"playerId":"player10@ssafy.com", "attackScore":58.0},
		]
}
```

### 📄TOP 10 방어 점수 랭킹 조회

**Request URL :** [GET]  /rank/defense

**권한** : 로그인 한 사용자

**Response:**

200 : 성공

```json

{
	"count":10,
	"data":
		[
			{"playerId":"player1@ssafy.com", "defenseScore":520.0},
			{"playerId":"player2@ssafy.com", "defenseScore":420.0},
			{"playerId":"player3@ssafy.com", "defenseScore":320.0},
			{"playerId":"player4@ssafy.com", "defenseScore":120.0},
			{"playerId":"player5@ssafy.com", "defenseScore":110.0},
			{"playerId":"player6@ssafy.com", "defenseScore":100.0},
			{"playerId":"player7@ssafy.com", "defenseScore":90.0},
			{"playerId":"player8@ssafy.com", "defenseScore":70.0},
			{"playerId":"player9@ssafy.com", "defenseScore":60.0},
			{"playerId":"player10@ssafy.com", "defenseScore":58.0},
		]
}
```

### 📄TOP 10 패스 점수 랭킹 조회

**Request URL :** [GET]  /rank/pass

**권한** : 로그인 한 사용자

**Response:**

200 : 성공

```json

{
	"count":10,
	"data":
		[
			{"playerId":"player1@ssafy.com", "passScore":520.0},
			{"playerId":"player2@ssafy.com", "passScore":420.0},
			{"playerId":"player3@ssafy.com", "passScore":320.0},
			{"playerId":"player4@ssafy.com", "passScore":120.0},
			{"playerId":"player5@ssafy.com", "passScore":110.0},
			{"playerId":"player6@ssafy.com", "passScore":100.0},
			{"playerId":"player7@ssafy.com", "passScore":90.0},
			{"playerId":"player8@ssafy.com", "passScore":70.0},
			{"playerId":"player9@ssafy.com", "passScore":60.0},
			{"playerId":"player10@ssafy.com", "passScore":58.0},
		]
}
```

## 💾[랭킹/업적 정보 저장]

### 💾사용자 랭크 정보 저장

**Request URL :** [POST]  /rank/update

**권한** : 로그인 한 사용자

**Request:**

JSON

```json
{
	"count":6,
	"data":
		[
			{
				"playerId":"player1@ssafy.com",
				"turnCount" : 30,
				"attackAttempt" : 7,
				"attackSuccess" : 4,
				"attackFail" : 3,
				"defenseAttempt" : 5,
				"defenseSuccess" : 5,
				"defenseFail": 0,
				"passCount" : 2,
			},
			{
				"playerId":"player2@ssafy.com",

				//...

			},

		]
}
```

<aside>
💡 **기능**

</aside>

- attackAttempt변수와 attackSuccess/Fail 변수를 통해 attackScore점수를 계산하고 playerId의 attackScore에 점수를 더해준다 → redis에 저장
- defenseAttempt변수와 defenseSuccess/Fail 변수를 통해 defenseScore점수를 계산하고 playerId의 defenseScore에 점수를 더해준다 → redis에 저장
- passCount 값을 playerId의 passCount값에 더해준다 → redis에 저장

**Response:**

200 : 성공

```json
{
	"statusCode" : 201,
	"message" : "사용자 정보 저장에 성공했습니다."
}
```

**Response:**

40X :

```json
{
	"statusCode" : 40X
	"message" : "정보 저장에 실패했습니다. 다시 시도해주세요."
}
```

### 💾사용자 업적 정보 저장

**Request URL :** [POST]  /feat/update

**권한** : 로그인 한 사용자

**Request:**

JSON

```json
{
	"count":6,
	"data":
		[
			{
				"playerId":"player1@ssafy.com",
				"turnCount" : 30,
				"{animal}attackSuccess" : 6,
				"{animal}attackFail" : 7,
				"{animal}defenseSuccess" : 4,
				"{animal}defenseFail" : 5,
				"{animal}믿음" : 5,
				"{animal}불신" : 5,
				"{animal}진실" : 5,
				"{animal}거짓" : 5
			},
			{
				"playerId":"player2@ssafy.com",

				//...
			},

		]
}
```

<aside>
💡 기능

</aside>

- 각 동물별 attackSuccess, attackFail, defenseSuccess, defenseFail, 믿음, 불신, 진실, 거짓 횟수를 player 테이블의 해당 컬럼 정보에 누적 시켜준다 → 업적 획득에 이용될 데이터로 활용

**Response:**

200 : 성공

```json
{
	"statusCode" : 201,
	"message" : "사용자 정보 저장에 성공했습니다."
}
```

**Response:**

40X :

```json
{
	"statusCode" : 40X
	"message" : "정보 저장에 실패했습니다. 다시 시도해주세요."
}
```