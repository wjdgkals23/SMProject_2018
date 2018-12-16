# NativeScript-Vue Application

> A native application built with NativeScript-Vue

# Settings (MAC OS)

## 공통부분
Nodejs (8 버전 이상으로 설치)
NativeCli (npm install -g nativescript)

### 아이폰 빌드 셋팅
1. sudo gem install xcodeproj
2. sudo gem install cocoapods
3. pod setup
4. pip install six
5. brew install xcproj

### 안드로이드 빌드 셋팅
1. brew tap caskroom/versions (brew cask 명령어를 통해 저장소를 생성하며 관리)
2. brew cask install java8
3. vi ~/.bash_profile 에 export JAVA_HOME=$(/usr/libexec/java_home -v 1.8) 기입
4. brew cask install android-sdk (해당 방식보다는 안드로이드 스튜디오를 설치하는 방식을 따라하는 것을 추천한다.)
5. vi ~/.bash_profile 에 export ANDROID_HOME=/usr/local/share/android-sdk


# 프로젝트 구성 설명 및 (NativeScript Vue 사용하면서 느낀 시행착오)

## 1. 데이터 관리 방식
### 1-1. Vuex 를 통한 데이터 중앙집중형 관리
* app/store/state.js -> 상태변수 선언
* app/store/action.js -> 상태변화 알림 및 실제 변환함수 호출
* app/store/mutation.js -> 데이터 상태 변환 함수
* 주의 : Vuex를 통해 중앙집중 관리하고 있는 상태는 반드시 mutation 함수를 통해 변환시켜야한다. 그렇지 않을 시 화면이 정지되는 현상을 겪게 된다.

## 2. 서버 통신 방식
### 2-1. 이미지 전송방식
* 이미지를 formdata 형태로 변환하여 서버로 전송하여야한다.
* NativeScript 오픈소스 중 nativescript-background-http를 활용하여 복수 이미지를 formdata로 전송할 수 있고(이 형태로 무조건 전송해야한다.)
* params 변수를 통해 텍스트 데이터 또한 전송이 가능하다.
* app/lib/senddata.js 를 보면 활용예시를 알 수 있다.
* 주의 : utf8을 headers의 파라미터로 하고 true 값을 주어야 한글이 깨지지않고 DB에 저장된다.

### 2-2. 서버 데이터 정리 방식
1. axios를 통해 받아온 데이터를 정리하는 방식은 Vuex를 사용하고 있기 때문에 결국 mutation.js 함수를 호출하여 정리하여야한다.
2. Vue 컴포넌트에서 app/lib/getpost.js 의 함수를 호출할 때 Vue 컴포넌트의 this값을 같이 넘겨준다.
3. axios 요청을 통해 완료가 되었을 때 then을 이용한 프로미스 함수 처리 부분에서 this.$store.dispatch 를 이용하여 app/store/action.js에 접근하고
app/store/mutation.js 를 호출하여 상태 변형을 진행한다.
* 참고 : 초기 앱의 데이터를 요청하는 방식은 Vue의 라이프사이클 중 created 를 이용하면 좋다. (그 이유는 Vue 컴포넌트의 data 부분이 활성화가 되는 최초시점이기 때문이다.)

### 2-3. 데이터 수신 완료 후 화면 전환
1. 2-2 에서 넘겨준 this 값을 이용해 화면전환을 진행할 수 있다.
2. vue(this의 매개변수).$navigateTo/navigateBack 등의 함수를 이용해서 데이터 수신이 완료되었을 때 원하는 화면으로 전환하는 방법을 사용하였다.
* 주의 : 화면자체에서 데이터를 변경하는 방법을 사용하지 못 했다. updated 함수나 watch를 통해 진행이 가능하다.

## 3. 기타 주의사항
### 3-1. 로컬 서버 접근 주소(3000포트 기준)
1. android : "http://10.0.2.2:3000"
2. ios : "http://127.0.0.1:3000"

