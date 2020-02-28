import React, { useContext, useRef, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Center from './Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from './AuthProvider';
import faker from 'faker';
import { addProductRoutes } from './addProductRoutes';

const Stack = createStackNavigator();

const Search = ({ navigation }) => {
	const [show, setShow] = useState(false);
	return (
		<Center>
			<Button
				title={show ? 'Hide Products' : 'Search Products'}
				onPress={() => {
					setShow(!show);
				}}
			/>
			{show && (
				<FlatList
					style={{ width: '100%' }}
					renderItem={({ item }) => {
						return (
							<Button
								color='#ff5c5c'
								title={item}
								onPress={() => {
									navigation.navigate('Product', {
										name: item
									});
								}}
							/>
						);
					}}
					keyExtractor={(product, idx) => product + idx}
					data={Array.from(Array(50), () => faker.commerce.product())}
				/>
			)}
		</Center>
	);
};

export const SearchStack = () => {
	const { logout } = useContext(AuthContext);
	return (
		<Stack.Navigator initialRouteName='Search'>
			<Stack.Screen name='Search' component={Search} />
			{addProductRoutes(Stack)}
		</Stack.Navigator>
	);
};
