import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from "../../Screen/Cliente/Inicio";

import { useAuth } from "../../Providers/AuthProviders";
import { Text, TouchableOpacity } from "react-native";
import { showToast } from "../../Components/funciones";
import { logout } from "../../Services/AuthService";
import Quote from "../../Screen/Cliente/Quote";
import { Icon } from "react-native-elements";
import Notificacion from "../../Screen/Cliente/Notificacion.";
import { useNavigation } from "@react-navigation/native";
import Home from "../../Screen/Cliente/Home";
import Graph from "../../Screen/Cliente/Graph";
import Reclamos from "../../Screen/Cliente/Reclamos";


const ChoferStacks = createNativeStackNavigator();


const ChoferStack = ({ }) => {
	const navigation = useNavigation();
	const { handleLogout } = useAuth();

	async function CerrarSession() {
		try {
			showToast("Hasta la proxima", "#1abc9c");
			await logout();
			await handleLogout();
		} catch (e) {
			console.log("DESDE CIERR SESSION", e)
		}
	}

	const ScreenNavigation = () => {
		navigation.navigate("Graph");
	}

	return (
		<ChoferStacks.Navigator initialRouteName="Home">
			<ChoferStacks.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: true,
					headerTitle: "Bienvenido",
					headerBackVisible: false,
					headerTitleAlign: "center",

					headerLeft: () => (
						<TouchableOpacity
							style={{
								marginLeft: 3, backgroundColor: '#f00',
								padding: 8,
								borderRadius: 5
							}}
							onPress={() => CerrarSession()}
						>
							<Text style={{ color: '#fff', }}>Salir</Text>
						</TouchableOpacity>
					),
				}}
			/>



			<ChoferStacks.Screen
				name="Inicio"
				component={Inicio}
				options={{
					headerShown: true,
					headerTitle: "Mapa",
					headerBackVisible: false,
					headerTitleAlign: "center",

					

					headerRight: () => (
						<TouchableOpacity
							style={{
								marginLeft: 3, backgroundColor: '#f00',
								padding: 8,
								borderRadius: 5
							}}
							onPress={() => ScreenNavigation()}
						>
							<Icon
								name="notifications"
								style={{ color: "white" }}
								color={"white"}
							/>
						</TouchableOpacity>
					),

				}}
			/>
			<ChoferStacks.Screen name="Reclamos"
				component={Reclamos} options={{ headerTitle: "Reclamos" }} />
			<ChoferStacks.Screen
				name="Graph"
				component={Graph}
				options={{
					headerShown: false,
					headerTitle: "",
					headerBackVisible: false,
					headerTitleAlign: "center",
				}}
			/>

			<ChoferStacks.Screen name="ScreenQuote"
				component={Quote} options={{
					headerTitle: "", headerTransparent: true,
					headerRight: () => (
						<TouchableOpacity
							style={{
								marginLeft: 3, backgroundColor: '#f00',
								padding: 8,
								borderRadius: 5
							}}
							onPress={() => ScreenNavigation()}
						>
							<Icon
								name="home"
								style={{ color: "white" }}
								color={"white"}
							/>
						</TouchableOpacity>
					),
				}}
			/>

			<ChoferStacks.Screen name="Notificacion"
				component={Notificacion} options={{ headerTitle: "", headerTransparent: true }} />


		</ChoferStacks.Navigator>
	);
};

export default ChoferStack;
