# API draft

## Common Rules

### Images

- 이미지 업로드는 프론트에서 스토리지에 먼저 업로드한 뒤, 백엔드에는 URL만 전달한다.
- 이미지에는 별도 `imageId`를 두지 않고, `imageUrl`을 식별값처럼 사용한다.
- 여러 장의 이미지는 `imageUrls` 배열 순서를 노출 순서로 본다.
- 등록/수정 API의 `imageUrls`는 최종 이미지 목록을 의미한다.
- 수정 요청에서 빠진 기존 `imageUrl`은 삭제된 이미지로 본다.
- 백엔드는 배열 index를 기준으로 DB의 `sort_order`를 저장한다.
- 같은 리소스 안에서 중복 `imageUrl`은 허용하지 않는다.
- 목록 API는 대표 이미지만 `thumbnailUrl`로 내려준다.
- 상세 API는 `imageUrls` 배열을 `sort_order` 기준으로 정렬해서 내려준다.
- 강아지 크기(`size`)는 프론트에서 입력하지 않고, 백엔드가 `weight`를 기준으로 계산한다.

## Auth

`GET /auth/google` — 구글 OAuth 시작

- Response: 구글 로그인 페이지로 리다이렉트

`GET /auth/google/callback` — 콜백 처리

- Response:

```json
{
    "accessToken": "string",
    "isNewUser": true
}
```

> refreshToken은 httpOnly 쿠키로 Set-Cookie 헤더에 담아서 응답

`POST /auth/refresh` — 토큰 재발급

- Request: body 없음, httpOnly 쿠키에서 refreshToken 자동 전송
- Response:

```json
{
    "accessToken": "string"
}
```

`GET /auth/me` 🔒 — 세션 유효성 확인

- Response:

```json
{
    "userId": 1,
    "nickname": "string",
    "isProfileComplete": true
}
```

`POST /auth/logout` 🔒 — 로그아웃

- Response: 200 OK, 쿠키 만료 처리

`DELETE /auth/account` 🔒 — 회원탈퇴

- Response: 200 OK, 쿠키 만료 처리

---

## User

`GET /users/check-nickname?nickname=` — 닉네임 중복 확인

- Response:

```json
{
    "isDuplicate": false
}
```

`POST /users/onboarding` 🔒 — 초기 정보 등록

- Request:

```json
{
    "nickname": "string",
    "regionSido": "string",
    "regionSigungu": "string"
}
```

- Response: 200 OK

`GET /users/me` 🔒 — 내 프로필 조회

- Response:

```json
{
    "userId": 1,
    "nickname": "string",
    "email": "string",
    "regionSido": "string",
    "regionSigungu": "string",
    "lifestyle": {
        "housingType": "APARTMENT | VILLA | HOUSE",
        "familyType": "SINGLE | COUPLE | WITH_CHILD",
        "hasPet": "NONE | DOG | CAT",
        "dailyOutTime": "UNDER_4H | 4_TO_8H | OVER_8H",
        "preferredTraits": ["ACTIVE", "CALM"],
        "preferredSize": "SMALL | MEDIUM | LARGE | ANY"
    }
}
```

`PUT /users/me` 🔒 — 라이프스타일 등록/수정

- Request:

```json
{
    "nickname": "string",
    "regionSido": "string",
    "regionSigungu": "string",
    "lifestyle": {
        "housingType": "APARTMENT | VILLA | HOUSE",
        "familyType": "SINGLE | COUPLE | WITH_CHILD",
        "hasPet": "NONE | DOG | CAT",
        "dailyOutTime": "UNDER_4H | 4_TO_8H | OVER_8H",
        "preferredTraits": ["ACTIVE", "CALM"],
        "preferredSize": "SMALL | MEDIUM | LARGE | ANY"
    }
}
```

- Response: 200 OK

---

## Dog

`POST /dogs` 🔒 — 강아지 등록

- Request:

```json
{
    "name": "string",
    "gender": "MALE | FEMALE",
    "breed": "string",
    "regionSido": "string",
    "regionSigungu": "string",
    "weight": 5.2,
    "traits": ["ACTIVE", "AFFECTIONATE"],
    "walkAmount": "UNDER_30M | 1H | OVER_2H",
    "isToiletTrained": true,
    "barkingLevel": "LOW | MEDIUM | HIGH",
    "isSeparationAnxiety": false,
    "canLiveInApartment": true,
    "canLiveWithChild": true,
    "canLiveWithDog": false,
    "canLiveWithCat": false,
    "isNeutered": true,
    "isVaccinated": true,
    "hasDisease": false,
    "diseaseDescription": null,
    "fosterNote": "string",
    "imageUrls": ["string"]
}
```

> `size`는 백엔드가 `weight`를 기준으로 계산
> `imageUrls` 배열 순서가 강아지 이미지 노출 순서

- Response:

```json
{
    "dogId": 1
}
```

`GET /dogs/me` 🔒 — 내 강아지 목록 조회

- Response:

```json
[
    {
        "dogId": 1,
        "name": "string",
        "thumbnailUrl": "string",
        "status": "AVAILABLE | ADOPTED",
        "applicationCount": 3
    }
]
```

`GET /dogs/recent?limit=` — 피드 상단 최근 강아지 목록

- Response:

```json
[
    {
        "dogId": 1,
        "name": "string",
        "thumbnailUrl": "string"
    }
]
```

`GET /dogs/{dogId}` 🔒 — 강아지 상세 조회

- Response:

```json
{
    "dogId": 1,
    "name": "string",
    "gender": "MALE",
    "breed": "string",
    "regionSido": "string",
    "regionSigungu": "string",
    "size": "SMALL",
    "weight": 5.2,
    "traits": ["ACTIVE", "AFFECTIONATE"],
    "walkAmount": "1H",
    "isToiletTrained": true,
    "barkingLevel": "MEDIUM",
    "isSeparationAnxiety": false,
    "canLiveInApartment": true,
    "canLiveWithChild": true,
    "canLiveWithDog": false,
    "canLiveWithCat": false,
    "isNeutered": true,
    "isVaccinated": true,
    "hasDisease": false,
    "diseaseDescription": null,
    "fosterNote": "string",
    "imageUrls": ["string"],
    "status": "AVAILABLE",
    "applicationCount": 3
}
```

`PUT /dogs/{dogId}` 🔒 — 강아지 정보 수정

- Request: 등록과 동일한 구조
- `imageUrls`는 수정 후 최종 강아지 이미지 목록
- 기존 이미지 중 request에 없는 URL은 삭제된 것으로 처리
- 백엔드는 `imageUrls` 배열 순서대로 `sort_order`를 다시 저장
- Response: 200 OK

`PATCH /dogs/{dogId}/complete` 🔒 — 입양완료 처리

- Response: 200 OK

`DELETE /dogs/{dogId}` 🔒 — 강아지 삭제

- Response: 200 OK

---

## Post

`GET /dogs/{dogId}/posts?cursor=&limit=` — 특정 강아지의 게시물 목록 조회

- Response:

```json
{
    "posts": [
        {
            "postId": 1,
            "thumbnailUrl": "string",
            "caption": "string",
            "likeCount": 24,
            "commentCount": 5,
            "createdAt": "string"
        }
    ],
    "nextCursor": "string"
}
```

`POST /posts` 🔒 — 게시물 작성

- Request:

```json
{
    "dogId": 1,
    "caption": "string",
    "imageUrls": ["string"]
}
```

> `imageUrls` 배열 순서가 게시물 이미지 노출 순서

- Response:

```json
{
    "postId": 1
}
```

`GET /posts?cursor=&limit=` — 피드 목록 조회

- Response:

```json
{
    "posts": [
        {
            "postId": 1,
            "author": {
                "userId": 1,
                "nickname": "string"
            },
            "dog": {
                "dogId": 1,
                "name": "string"
            },
            "thumbnailUrl": "string",
            "caption": "string",
            "likeCount": 24,
            "commentCount": 5,
            "createdAt": "string"
        }
    ],
    "nextCursor": "string"
}
```

`GET /posts/{postId}` — 게시물 상세 조회

- 비로그인 요청 시 `isLiked`는 `false`
- Response:

```json
{
    "postId": 1,
    "author": {
        "userId": 1,
        "nickname": "string"
    },
    "dog": {
        "dogId": 1,
        "name": "string",
        "status": "AVAILABLE | ADOPTED"
    },
    "imageUrls": ["string"],
    "caption": "string",
    "likeCount": 24,
    "isLiked": true,
    "commentCount": 5,
    "createdAt": "string"
}
```

`PUT /posts/{postId}` 🔒 — 게시물 수정

- Request:

```json
{
    "caption": "string",
    "imageUrls": ["string"]
}
```

- `imageUrls`는 수정 후 최종 게시물 이미지 목록
- 기존 이미지 중 request에 없는 URL은 삭제된 것으로 처리
- 백엔드는 `imageUrls` 배열 순서대로 `sort_order`를 다시 저장
- Response: 200 OK

`DELETE /posts/{postId}` 🔒 — 게시물 삭제

- Response: 200 OK

`POST /posts/{postId}/like` 🔒 — 좋아요 토글

- Response:

```json
{
    "isLiked": true,
    "likeCount": 25
}
```

`POST /posts/{postId}/comments` 🔒 — 댓글 작성

- Request:

```json
{
    "content": "string",
    "parentId": null
}
```

- Response:

```json
{
    "commentId": 1,
    "parentId": null,
    "content": "string",
    "createdAt": "string"
}
```

`GET /posts/{postId}/comments?cursor=&limit=` — 댓글 목록 조회

- Response:

```json
{
    "comments": [
        {
            "commentId": 1,
            "parentId": null,
            "author": {
                "userId": 1,
                "nickname": "string"
            },
            "content": "string",
            "createdAt": "string",
            "replies": [
                {
                    "commentId": 2,
                    "parentId": 1,
                    "author": {
                        "userId": 2,
                        "nickname": "string"
                    },
                    "content": "string",
                    "createdAt": "string"
                }
            ]
        }
    ],
    "nextCursor": "string"
}
```

`DELETE /posts/{postId}/comments/{commentId}` 🔒 — 댓글 삭제

- Response: 200 OK

---

## Match

`GET /match/recommendations?lastDogId=` 🔒 — 추천 강아지 조회

- 라이프스타일 미입력 시 400 반환
- Response:

```json
{
    "dogId": 1,
    "name": "string",
    "breed": "string",
    "gender": "MALE",
    "regionSido": "string",
    "size": "SMALL",
    "weight": 5.2,
    "traits": ["ACTIVE", "AFFECTIONATE"],
    "walkAmount": "1H",
    "isToiletTrained": true,
    "barkingLevel": "MEDIUM",
    "canLiveInApartment": true,
    "canLiveWithChild": true,
    "canLiveWithDog": false,
    "canLiveWithCat": false,
    "fosterNote": "string",
    "imageUrls": ["string"],
    "matchScore": 87,
    "matchReasons": ["아파트 생활 가능", "선호하는 성격과 잘 맞음"],
    "cautionReasons": ["산책을 즐긴다면 더 좋아요"],
    "posts": [
        {
            "postId": 1,
            "thumbnailUrl": "string"
        }
    ]
}
```

---

## Adoption

`POST /adoptions` 🔒 — 입양 신청

- Request:

```json
{
    "dogId": 1,
    "introduction": "string"
}
```

- Response:

```json
{
    "adoptionId": 1
}
```

`GET /adoptions/applicants` 🔒 — 신청자 목록 조회 (임보자용)

- Response:

```json
[
    {
        "adoptionId": 1,
        "dogId": 1,
        "applicant": {
            "userId": 1,
            "nickname": "string",
            "housingType": "APARTMENT",
            "familyType": "SINGLE",
            "dailyOutTime": "UNDER_4H"
        },
        "matchScore": 87,
        "introduction": "string",
        "status": "PENDING | ACCEPTED | REJECTED | COMPLETE",
        "contactInfo": {
            "email": "string"
        },
        "appliedAt": "string"
    }
]
```

> `contactInfo`는 status가 ACCEPTED인 경우에만 포함

`PATCH /adoptions/{adoptionId}/status` 🔒 — 신청 수락/거절

- Request:

```json
{
    "status": "ACCEPTED | REJECTED | COMPLETE"
}
```

- Response: 200 OK

`GET /adoptions/me` 🔒 — 내 신청 내역 조회 (입양자용)

- Response:

```json
[
    {
        "adoptionId": 1,
        "dog": {
            "dogId": 1,
            "name": "string",
            "thumbnailUrl": "string"
        },
        "status": "PENDING | ACCEPTED | REJECTED | COMPLETE",
        "contactInfo": {
            "email": "string"
        },
        "appliedAt": "string"
    }
]
```

> `contactInfo`는 status가 ACCEPTED인 경우에만 포함

---

![DB_0507.png](attachment:627d21ea-11b8-4f37-b072-c86339167d05:DB_0507.png)
