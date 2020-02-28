import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Center from '../../common/Center';
import { AuthContext } from '../../Provider/AuthProvider';

import {
	Ionicons,
	AntDesign,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';
import { DrawerTabs } from '../DrawerNavigation/DrawerTabs';

const Tabs = createBottomTabNavigator();

export const AppTabs = () => {
	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						// iconName = focused ? 'home' : 'home-outline';
						iconName = 'home';
						return <AntDesign name={iconName} size={size} color={color} />;
					} else if (route.name === 'Search') {
						iconName = focused ? 'account-search' : 'account-search-outline';
						// iconName = 'account-search';
					} else if (route.name === 'Menu') {
						return <AntDesign name={'menuunfold'} size={size} color={color} />;
					}

					// You can return any component that you like here!
					return (
						<MaterialCommunityIcons name={iconName} size={size} color={color} />
					);
				}
			})}
			tabBarOptions={{
				activeTintColor: 'rgb(132, 12, 200)',
				inactiveTintColor: 'lightgray'
			}}
		>
			<Tabs.Screen name='Home' component={HomeStack} />
			<Tabs.Screen name='Search' component={SearchStack} />
			<Tabs.Screen name='Menu' component={DrawerTabs} />
		</Tabs.Navigator>
	);
};
