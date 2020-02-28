import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { AppTabs } from './Navigation/BottomNavigation/AppTabs';

import Center from './common/Center';
import { AuthContext } from './Provider/AuthProvider';
import { AuthStack } from './Navigation/AuthStack';
import { DrawerTabs } from './Navigation/DrawerNavigation/DrawerTabs';

export const Routes = () => {
	const { user, login } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if the user is logged in
		AsyncStorage.getItem('user')
			.then(userString => {
				if (userString) {
					// decode it
					login();
					setLoading(false);
				}
				setLoading(false);
				console.log(userString);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<Center>
				<ActivityIndicator size='large' />
			</Center>
		);
	}

	return (
		<NavigationContainer>
			{user ? (
				<>
					<AppTabs />
				</>
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	);
};
