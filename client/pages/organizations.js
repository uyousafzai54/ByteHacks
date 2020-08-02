//organizations page
import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	Keyboard,
} from "react-native";
import Card from "../components/card";
import NewOrgBtn from "../components/addNewOrgBtn";
import AddOrgMenu from "../components/addNewOrgMenu";
import styles from "../styles/welcomepage";
import orgStyles from "../styles/organizations";
import AsyncStorage from "@react-native-community/async-storage";
import ProfileButton from "../components/profileButton.js";

export default function organizations(props) {
	useEffect(() => {
		retrieveData().then((response) => {
			setData(response);
		});
	}, []);

	const [data, setData] = useState();
	const url = "http://159.203.16.113:3000/organizations/getList";

	async function retrieveData() {
		let jwt = await AsyncStorage.getItem("Token").catch((err) => {
			console.log(err);
		});
		try {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			return response.json(); //parses response as json and returns a promise
		} catch (error) {
			console.log(error);
		}
	}

	const [isVisible, setIsVisible] = useState(false);

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => props.navigation.navigate("OrganizationDetails", item)}
		>
			console.log(item.)
			<Card>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</Card>
		</TouchableOpacity>
	);

	const onPressPlus = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
			<View style={styles.container2}>
				<Image
					source={require("../assets/background-logged-in.jpg")}
					style={orgStyles.backgroundImage}
				/>


				<View style={orgStyles.textContainer}>
					<Text style={orgStyles.textTitle2}>My Organizations</Text>
					<View style={styles.flatlistContainer}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item) => item._id}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</View>
				<ProfileButton
					onPress={() => {
						props.navigation.navigate("Profile");
					}}
				/>
				<NewOrgBtn onPress={onPressPlus} text="+" />
				<AddOrgMenu
					props={props}
					isVisible={isVisible}
					setIsVisible={setIsVisible}
					retrieveData={retrieveData}
					setData={setData}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}
