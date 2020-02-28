import React, { useContext, useRef, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Center from '../../common/Center';
import { Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { AuthContext } from '../../Provider/AuthProvider';
import faker from 'faker';
import { addProductRoutes } from './Product/addProductRoutes';
import { DrawerTabs } from '../DrawerNavigation/DrawerTabs';
import { DrawerActions } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

const Stack = createStackNavigator();

export const Search = ({ navigation }) => {
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

export const SearchStack = ({ navigation }) => {
	const { logout } = useContext(AuthContext);

	return (
		<Stack.Navigator initialRouteName='Search'>
			<Stack.Screen
				name='Search'
				component={DrawerTabs}
				options={{
					headerLeft: () => {
						return (
							<TouchableOpacity
								style={{ marginLeft: 10 }}
								onPress={() => {
									navigation.dispatch(DrawerActions.toggleDrawer());
								}}
							>
								{/* <Text>{isDrawerOpen ? 'Close' : 'Open'}</Text> */}
								<AntDesign name={'menuunfold'} size={30} color={'red'} />
							</TouchableOpacity>
						);
					},
					headerTitleAlign: 'center'
				}}
			/>
			{addProductRoutes(Stack)}
		</Stack.Navigator>
	);
};
