import React from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = React.createContext({});

export const AuthProvider = props => {
	const [user, setUser] = React.useState(null);
	return (
		<AuthContext.Provider
			value={{
				user,
				login: () => {
					const fakeUser = { username: 'bob' };
					setUser(fakeUser);
					AsyncStorage.setItem('user', JSON.stringify(fakeUser));
				},
				logout: () => {
					AsyncStorage.removeItem('user');
				}
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
