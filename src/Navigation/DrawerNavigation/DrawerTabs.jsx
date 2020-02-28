import React from 'react';
import { View, Text, Button } from 'react-native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem
} from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { Search } from '../BottomNavigation/SearchStack';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
				onPress={() => navigation.navigate('Notifications')}
				title='Go to notifications'
			/>
		</View>
	);
}

function HomeScreen2({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button
				onPress={() => navigation.navigate('Search')}
				title='Go to notifications'
			/>
			<Search />
		</View>
	);
}

function NotificationsScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button onPress={() => navigation.goBack()} title='Go back home' />
			<Button onPress={() => navigation.toggleDrawer()} title='TOGGLE' />
		</View>
	);
}

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem
				label='Close drawer'
				onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
			/>
			<DrawerItem
				label='Toggle drawer'
				onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
			/>
		</DrawerContentScrollView>
	);
}

export const DrawerTabs = () => {
	return (
		<Drawer.Navigator
			initialRouteName='Home'
			drawerContent={props => CustomDrawerContent(props)}
		>
			<Drawer.Screen name='Home' component={HomeScreen} />
			<Drawer.Screen name='Notifications' component={NotificationsScreen} />
			<Drawer.Screen name='HomeScreen2' component={HomeScreen2} />
		</Drawer.Navigator>
	);
};
