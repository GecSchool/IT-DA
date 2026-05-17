# Picture Flow

## 기본 원칙

- 클라이언트는 이미지를 Next.js 서버(Route Handler)에 업로드한다.
- Next.js 서버는 `JWT_SECRET`으로 accessToken을 직접 검증한 뒤 S3에 이미지를 업로드한다.
- 이미지 조회 URL은 CloudFront URL을 사용한다.
- Spring 백엔드는 이미지 파일 바이너리를 받지 않고, 이미지 URL만 저장한다.
- 이미지에는 별도 `imageId`를 두지 않고, `imageUrl`을 식별값처럼 사용한다.
- 같은 강아지 또는 게시물 안에서 중복 `imageUrl`은 허용하지 않는다.
- 대표 이미지는 `sort_order`가 가장 작은 이미지다.

## 환경 변수

```env
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_CLOUDFRONT_URL=
JWT_SECRET=
```

S3 key는 `domain/yyyy/mm/{uuid}.{ext}` 형식으로 생성한다.
`JWT_SECRET`은 Spring 백엔드가 accessToken 발급에 사용하는 HS256 secret과 동일해야 한다.

## 등록 흐름

```text
클라이언트 -> Next.js 서버(Route Handler)
           -> JWT secret으로 accessToken 검증
           -> S3 업로드
           <- imageUrl 반환

클라이언트 -> Spring 백엔드 API(강아지 등록, 게시물 작성 등)
           -> body에 imageUrls 포함해서 전송
           -> DB에 imageUrl과 sort_order 저장
```

```json
{
    "imageUrls": [
        "https://storage.example.com/image-1.jpg",
        "https://storage.example.com/image-2.jpg"
    ]
}
```

## 수정 흐름

1. 프론트가 상세 API에서 기존 `imageUrls`를 받는다.
2. 프론트는 기존 URL과 새로 업로드한 URL을 하나의 배열로 관리한다.
3. 사용자가 삭제한 이미지는 배열에서 제거한다.
4. 사용자가 이미지 순서를 바꾸면 배열 순서를 바꾼다.
5. `PUT /dogs/{dogId}` 또는 `PUT /posts/{postId}`에 최종 `imageUrls` 배열을 전달한다.
6. Spring 백엔드는 기존 이미지 목록을 요청받은 최종 배열 기준으로 교체한다.
7. Spring 백엔드는 새 배열 순서대로 `sort_order`를 다시 저장한다.

```json
{
    "imageUrls": [
        "https://storage.example.com/image-2.jpg",
        "https://storage.example.com/image-3.jpg"
    ]
}
```

## 삭제가 필요한 케이스

| 케이스 | S3 삭제 | DB 삭제 |
| --- | --- | --- |
| 작성 중 취소 | Next.js 서버 | 저장 전이므로 불필요 |
| 게시물 삭제 | Next.js 서버 | Spring 백엔드 |
| 강아지 삭제 | Next.js 서버 | Spring 백엔드 |
| 강아지 정보 수정 중 사진 제거 | Next.js 서버 | Spring 백엔드 |
| 게시물 수정 중 사진 제거 | Next.js 서버 | Spring 백엔드 |

## 삭제 흐름

### 작성 중 취소

```text
클라이언트가 사진 업로드 -> Next.js 서버 -> S3 업로드 완료
클라이언트가 작성 취소
클라이언트 -> Next.js 서버에 업로드했던 imageUrls 전달
           -> S3에서 삭제
```

DB에 저장되기 전이므로 Spring 백엔드 호출은 필요 없다.

### 게시물 또는 강아지 삭제

```text
클라이언트가 삭제 대상 imageUrls를 보관
클라이언트 -> Spring 백엔드 DELETE /posts/{postId} 또는 DELETE /dogs/{dogId}
           -> DB 삭제

클라이언트 -> Next.js 서버(Route Handler)
           -> 보관해 둔 imageUrls를 전달해 S3에서 삭제
```

Spring 백엔드는 DB 처리를 담당하고, 삭제된 이미지 URL을 응답으로 내려주지 않는다. S3 삭제는 클라이언트가 알고 있던 `imageUrls`를 Next.js 서버에 전달해서 처리한다.

### 수정 중 이미지 제거

```text
클라이언트가 기존 imageUrls와 최종 imageUrls를 비교해 제거된 imageUrls 계산
클라이언트 -> Spring 백엔드 PUT /posts/{postId} 또는 PUT /dogs/{dogId}
           -> 최종 imageUrls 전달
           -> DB 이미지 목록 교체

클라이언트 -> Next.js 서버(Route Handler)
           -> 제거된 imageUrls를 전달해 S3에서 삭제
```

수정 요청에서 빠진 기존 `imageUrl`은 삭제된 이미지로 본다.

## 조회 규칙

- 목록 API는 대표 이미지만 `thumbnailUrl`로 내려준다.
- 상세 API는 `sort_order` 기준으로 정렬된 `imageUrls` 배열을 내려준다.
- 대표 이미지는 첫 번째 `imageUrls[0]`와 동일하다.
