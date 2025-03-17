import React, {useEffect} from 'react';
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

// 탭바 영역
const Tap = createBottomTabNavigator();

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <NavigationContainer>
      <Tap.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Tap.Screen
          name="Exchanges"
          component={ExchangeScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="exchange-alt"
                  iconStyle="solid"
                  color={focused ? '#1263ce' : 'a0a0a0'}
                  size={16}
                />
              );
            },
          }}
        />
        <Tap.Screen
          name="Tags"
          component={TagsScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="tags"
                  iconStyle="solid"
                  color={focused ? '#1263ce' : 'a0a0a0'}
                  size={16}
                />
              );
            },
          }}
        />
        <Tap.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="home"
                  iconStyle="solid"
                  color={focused ? '#1263ce' : 'a0a0a0'}
                  size={16}
                />
              );
            },
          }}
        />
        <Tap.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="search"
                  iconStyle="solid"
                  color={focused ? '#1263ce' : 'a0a0a0'}
                  size={16}
                />
              );
            },
          }}
        />
        <Tap.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome5
                  name="user-alt"
                  iconStyle="solid"
                  color={focused ? '#1263ce' : 'a0a0a0'}
                  size={16}
                />
              );
            },
          }}
        />
      </Tap.Navigator>
    </NavigationContainer>
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
*/
