import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text } from 'react-native';
import { AuthContext } from './AuthProvider';
import Center from './Center';

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

const Stack = createStackNavigator();
export const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null
			}}
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
	);
};
