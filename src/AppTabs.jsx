import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Center from './Center';
import { AuthContext } from './AuthProvider';
import {
	Ionicons,
	AntDesign,
	MaterialCommunityIcons
} from '@expo/vector-icons';
import { HomeStack } from './HomeStack';

const Tabs = createBottomTabNavigator();

const Search = () => {
	return (
		<Center>
			<Text>Search</Text>
		</Center>
	);
};

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
			<Tabs.Screen name='Search' component={Search} />
		</Tabs.Navigator>
	);
};
