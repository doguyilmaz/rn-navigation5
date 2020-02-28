import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
import Center from '../../../common/Center';

const Product = ({ route, navigation }) => {
	return (
		<Center>
			<Text>{route.params.name}</Text>
			{/* <Button
				color='#ff5c5c'
				title='Back'
				onPress={() => {
					navigation.navigate('Feed');
				}}
			/> */}
			<Button
				color='red'
				title='Edit'
				onPress={() => {
					navigation.navigate('EditProduct', {
						name: route.params.name
					});
				}}
			/>
		</Center>
	);
};

const apiCall = x => {
	return x;
};

const EditProduct = ({ route, navigation }) => {
	const [formState] = useState();
	const submit = useRef(() => {});

	submit.current = async () => {
		// api call with new form state
		await apiCall(formState);
		navigation.goBack();
	};

	useEffect(() => {
		navigation.setParams({ submit });
	}, []);

	return (
		<Center>
			<Text>Editing {route.params.name}...</Text>
		</Center>
	);
};

export const addProductRoutes = Stack => {
	return (
		<>
			<Stack.Screen
				options={({ route }) => ({
					headerTitle: `Product: ${route.params.name}`
				})}
				name='Product'
				component={Product}
			/>
			<Stack.Screen
				options={({ route }) => ({
					headerTitle: `Edit: ${route.params.name}`,
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								// Submit form
								if (route.params.submit) route.params.submit.current();
							}}
							style={{
								padding: 5,
								backgroundColor: 'lightgray',
								marginRight: 10,
								borderRadius: 10
							}}
						>
							<Text style={{ color: 'red' }}>Done</Text>
						</TouchableOpacity>
					)
				})}
				name='EditProduct'
				component={EditProduct}
			/>
		</>
	);
};
