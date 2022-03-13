# On Air Super Live

## 소개
[poster]

[Animated GIF]

## 주요 기능
✅  진행중인 모든 라이브 방송 프리뷰 제공
✅  시청자와 스트리머 간 채팅, 하트 보내기
✅  시청자 수와 입장시 알림 기능
✅  Drag and Drop을 이용한 2채널 동시 시청
✅  스트리머에게 url을 받아 상품 배너 생성
✅  지나간 방송 다시보기

## Getting Started

We need the RTMP server first. Download the repository below and follow the README information.

Server : https://github.com/TeamGreyOrg/super_live_server.git

## Config

Then we check the _src/config.js_ to edit the server information. Fill in your localhost server information (Ip address, Port)

```js
export const SOCKET_IO_SERVER = 'http://192.168.0.14:3333'; // Edit this
export const RTMP_SERVER = 'rtmp://192.168.0.14'; // Edit this
```

## Install package

```bash
npm install 

or 

yarn install
```

### Android

```bash
npm run android 

or

yarn run run-android
```

### Version
node js version : 14.15.0

java version : 15.0.1

javac version : 15.0.1

react native version 6.4.0

```bash
node -v
java --version
javac --version
react-native --version
```

