import React, { useState, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Text, ActivityIndicator, AsyncStorage } from 'react-native';

import Center from './Center';
import { AuthContext } from './AuthProvider';

const Stack = createStackNavigator();
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
	}, [loading, setLoading]);

	if (loading) {
		return (
			<Center>
				<ActivityIndicator size='large' />
			</Center>
		);
	}

	const Login = ({ navigation }) => {
		const { login } = useContext(AuthContext);
		return (
			<Center>
				<Text style={{ marginBottom: 10 }}>Login Screen</Text>
				<Button
					title='Go To Register'
					onPress={() => {
						navigation.navigate('Register');
					}}
				/>
				<Button
					title='Log me in'
					onPress={() => {
						login();
					}}
				/>
			</Center>
		);
	};

	const Register = ({ navigation }) => {
		return (
			<Center>
				<Text style={{ marginBottom: 10 }}>Register Screen</Text>
				<Button
					title='Go To Login'
					onPress={() => {
						navigation.navigate('Login');
						// navigation.goBack();
					}}
				/>
			</Center>
		);
	};

	return (
		<NavigationContainer>
			{user ? (
				<Center>
					<Text>you exist</Text>
				</Center>
			) : (
				<Stack.Navigator
					// screenOptions={{
					// 	header: () => null
					// }}
					initialRouteName='Login'
				>
					<Stack.Screen
						options={{
							headerTitle: 'Sign In',
							headerTitleAlign: 'center'
						}}
						name='Login'
						component={Login}
					/>
					<Stack.Screen
						name='Register'
						options={{
							// header: () => null
							headerTitle: 'Sign Up',
							headerTitleAlign: 'center'
						}}
						component={Register}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
