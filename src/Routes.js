import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, AsyncStorage } from 'react-native';

import Center from './Center';
import { AuthContext } from './AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';

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
			{user ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	);
};
