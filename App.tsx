import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';
import TagsScreen from './screens/TagsScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import ProfileScreen from './screens/ProfileScreen';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import HomeStack from './components/HomeStack';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View, TouchableOpacity, Image, Text} from 'react-native';

// 탭바 영역
const Tap = createBottomTabNavigator();

function App() {
  const [state, setState] = useState({
    userInfo: null,
  });

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });
  // 로그인할 때 api요청을 넣는 것이기 때문에 webClientID가 필요함
  // webClientId는 API요청을 어느 경로로 넣을것인지를 의미함
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '548903654394-7k9rreekqt1ee0i4403j6c9otmvmgfdg.apps.googleusercontent.com',
      iosClientId:
        '548903654394-impol0764feu39duufv7kniiiqi7s9v9.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // 핸드폰에 구글 플레이서비스가 설치되어져있는지 확인
      const response = await GoogleSignin.signIn(); //로그인
      if (isSuccessResponse(response)) {
        setState({userInfo: response.data});
        console.log(response.data);
      } else {
        console.log('canceled sign');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.error('in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error('Play services not available');
            break;
          default:
            console.error(error.code + ': ' + error.message);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#eeeeee',
          padding: '5%',
          margin: '5%',
          borderRadius: 10,
        }}
        onPress={signIn}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png',
            }}
            style={{
              width: '7.5%',
              height: '127.5%',
              marginTop: '-0.5%',
              marginLeft: '2.5%',
              marginRight: '2.5%',
            }}
          />
          <Text style={{fontSize: 18}}>Login with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
    // <NavigationContainer>
    //   <Tap.Navigator
    //     screenOptions={{headerShown: false}}
    //     initialRouteName="Home">
    //     <Tap.Screen
    //       name="Exchanges"
    //       component={ExchangeScreen}
    //       options={{
    //         tabBarIcon: ({focused}) => {
    //           return (
    //             <FontAwesome5
    //               name="exchange-alt"
    //               iconStyle="solid"
    //               color={focused ? '#1263ce' : 'a0a0a0'}
    //               size={16}
    //             />
    //           );
    //         },
    //       }}
    //     />
    //     <Tap.Screen
    //       name="Tags"
    //       component={TagsScreen}
    //       options={{
    //         tabBarIcon: ({focused}) => {
    //           return (
    //             <FontAwesome5
    //               name="tags"
    //               iconStyle="solid"
    //               color={focused ? '#1263ce' : 'a0a0a0'}
    //               size={16}
    //             />
    //           );
    //         },
    //       }}
    //     />
    //     <Tap.Screen
    //       name="Home"
    //       component={HomeStack}
    //       options={{
    //         tabBarIcon: ({focused}) => {
    //           return (
    //             <FontAwesome5
    //               name="home"
    //               iconStyle="solid"
    //               color={focused ? '#1263ce' : 'a0a0a0'}
    //               size={16}
    //             />
    //           );
    //         },
    //       }}
    //     />
    //     <Tap.Screen
    //       name="Search"
    //       component={SearchScreen}
    //       options={{
    //         tabBarIcon: ({focused}) => {
    //           return (
    //             <FontAwesome5
    //               name="search"
    //               iconStyle="solid"
    //               color={focused ? '#1263ce' : 'a0a0a0'}
    //               size={16}
    //             />
    //           );
    //         },
    //       }}
    //     />
    //     <Tap.Screen
    //       name="Profile"
    //       component={ProfileScreen}
    //       options={{
    //         tabBarIcon: ({focused}) => {
    //           return (
    //             <FontAwesome5
    //               name="user-alt"
    //               iconStyle="solid"
    //               color={focused ? '#1263ce' : 'a0a0a0'}
    //               size={16}
    //             />
    //           );
    //         },
    //       }}
    //     />
    //   </Tap.Navigator>
    // </NavigationContainer>
  );
}

export default App;

/*
  <NavigationContainer>
    화면 이동 구현
  </NavigationContainer>
  즉, NavigationContainer -> 말그대로 화면 이동을 담당
  Tap.Navigator -> 탭바 영역을 담당(ex. '메인, 채팅, 설정'이렇게 세개의 탭이 있다고 하면)
  Tap.Screen -> 하나의 탭을 말함(ex. 메인 -> 이렇게 하나의 탭을 말한다)
    - Tap.Screen은 하나의 탭을 담당하기 때문에 name과 component가 필수고 필요하다
    - name은 스크린의 이름(ex. main, setting 등)
    - components는 각 탭을 눌렀을 때 어느 스크린으로 보내줘야 하는지를 의미한다 -> 즉, 탭을 눌렀을때 어느 화면을 가장 처음으로 보여줄 것인지
    - Tab.Screen은 각 화면을 나타낸다 -> 내가 5개의 탭을 만들려면? -> Tab.Screen을 총 5개 만들어야 한다

  탭바 구현하는 방법
  1. npm install @react-navigation/native
  2. npm install react-native-screens react-native-safe-area-context
  3. import {NavigationContainer} from '@react-navigation/native';
  4. 최상단에 <NavigaionCotainer></NavigaionCotainer> -> 이 NavigationContainer안에 화면 이동 구현
  5. import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
  6. const Tap = createBottomTabNavigator();을 통해 탭바를 생성한다
  7. 그리고 <NavigationContainer><Tap.Navigator></Tap.Navigator></NavigationContainer>이렇게 Tab.Navigation을 적어서 Tab 컨테이너를 만든다
  8. Tab.Screen을 만들어준다 -> ex 탭바가 3개라면
    <NavigationContainer>
      <Tap.Navigator>
        <Tab.Screen name="first" components={first}/>
        <Tab.Screen name="second" components={second}/>
        <Tab.Screen name="third" components={third}/>
      </Tap.Navigator>
    </NavigationContainer>

  화면 이동 구현하는 방법
  1. npm install @react-navigation/native-stack설치한다
  2. stack을 만든다 -> ex) HomeStack.tsx파일
    - import {createNativeStackNavigator} from '@react-navigation/native-stack';
    - const Stack = createNativeStackNavigator();
  3. 거기에 이동하고 싶은 화면들을 작성한다 (ex. HomeScreen, Details)
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  4. Tab.Screen의 component={HomeStack}이런식으로 stack을 적용해준다
  5. 실제 이동을 해야 하는 부분에서 navigation을 가지고 와서 onPress가 눌리면 이동하게 해준다(Coin.tsx파일)
    - import { useNavigation } from '@react-navigation/native'
    - const navigation = useNavigation();
    - button onPress={() => {}}

  함수 컴포넌트 내부와 외부에 변수를 선언하는 차이 -> 그 변수의 용도와 리렌더링 관계에 따라 결정됨
  함수 컴포넌트 외부에 선언하는 경우(ex: const {width, height})
    - 컴포넌트가 리렌더링되어도 다시 계산되지 않는 값들
    - 컴포넌트 인스턴스 간에 공유되어도 문제없는 값들
    - 앱 실행 시 한 번만 계산하면 되는 값들
    - const {width, height}: Dimension.get('screen')와 같은 작업은 화큰 크기를 가져오는 작업으로, 일반적으로 앱이 시작될 떄 한번만 계산해도 충분함
  함수 컴포넌트 내부에 선언하는 경우
    - 컴포넌트의 상태(state)와 관련된 값들
    - 컴포넌트가 받는 props에 의존하는 값들
    - 컴포넌트 인스턴스마다 고유해야 하는 값들
    - 리렌드링마다 다시 계산/참조해야 하는 값들

*/
