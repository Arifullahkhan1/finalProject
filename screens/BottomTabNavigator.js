import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constants';
//import { , , } from '../screens/tabScreens';
import Services  from './tabScreens/Services';
import MyCar  from './tabScreens/MyCar';
import Deals  from './tabScreens/Deals';
import Profile  from './tabScreens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

//import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({color, size, focused}) => {
          let iconName;

          if (route.name === ROUTES.MYCAR) {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === ROUTES.SERVICES) {
            iconName = focused ? 'build' : 'build-outline';
          } else if (route.name === ROUTES.DEALS) {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === ROUTES.PROFILE) {
            iconName  = focused
              ? 'person-circle'
              : 'person-circle-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen
        name={ROUTES.MYCAR}
        component={MyCar}
        options={{
          tabBarButton: props => <CustomTabBarButton route="MyCar" {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.SERVICES}
        component={Services}
        options={{
          tabBarButton: props => <CustomTabBarButton route="Services" {...props} />,
        }}
      />
      <Tab.Screen
     
        name={ROUTES.DEALS}
        component={Deals}
        options={{
          headerShown:true,
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          headerShown:true,
          tabBarLabel: 'Profile',
          title: 'Profile',
            tabBarButton: props => (
            <CustomTabBarButton route="Profile" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderRadius: 10,
    bottom: 15,
    right: 10,
    left: 10,
    height: 80,
    marginBottom:9,
  },
});
