import React, { useState, useEffect } from "react";
import moment from "moment";
import { Text, View, ScrollView, Image } from "react-native";
import Card from "../components/card";
import styles from "../styles/globalStyles";
import AsyncStorage from "@react-native-community/async-storage";
import Button from "../components/button";
import { vh, vw } from "react-native-expo-viewport-units";

export default function votingPage(props) {
	const [id, setID] = useState();
	const [data, setData] = useState();
	if (!id) {
		setID(props.navigation.getParam("_id"));
	}

	const fetchData = async () => {
		const url = `http://159.203.16.113:3000/ballots/getBallot?id=${id}`;
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
			let data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		props.navigation.addListener("willFocus", () => {
			fetchData();
		});
		fetchData();
	}, []);
	// empty array makes it so that the page doesn't rerender upon update instead renders upon component mounting

	if (!data) {
		return null;
	}

	const supports = data.arguments["support"].map((s) => (
		<View style={{ marginLeft: vw(3) }} key={Math.ceil(Math.random() * 100000000)}>
			<Text
				style={{
					fontStyle: "italic",
					color: "black",
					marginTop: vh(0.3),
					marginBottom: vh(0.3),
				}}
			>{`\u2022 ${s}`}</Text>
		</View>
	));

	const against = data.arguments["against"].map((a) => (
		<View style={{ marginLeft: vw(3) }} key={Math.ceil(Math.random() * 100000000)}>
			<Text
				style={{
					fontStyle: "italic",
					color: "black",
					marginTop: vh(0.3),
					marginBottom: vh(0.3),
				}}
			>{`\u2022 ${a}`}</Text>
		</View>
	));

	if (supports.length === 0) {
		supports.push(<View style={{ marginLeft: vw(3) }} key={Math.ceil(Math.random() * 10000000)}>
			<Text
				style={{
					fontStyle: "italic",
					color: "grey",
					marginTop: vh(0.3),
					marginBottom: vh(0.3),
				}}
			>{`\u2022 There's nothing here. Why not add one?`}</Text>
		</View>)
	}
	if (against.length === 0) {
		against.push(<View style={{ marginLeft: vw(3) }} key={Math.ceil(Math.random() * 10000000)}>
			<Text
				style={{
					fontStyle: "italic",
					color: "grey",
					marginTop: vh(0.3),
					marginBottom: vh(0.3),
				}}
			>{`\u2022 There's nothing here. Why not add one?`}</Text>
		</View>)
	}

	return (
		<View style={{ backgroundColor: "#dab" }}>
			<Image
				source={require("../assets/background-logged-in.jpg")}
				style={styles.organizationBackgroundImage}
			/>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<Text
						style={{
							...styles.textTitleOrgDetails,
							color: "white",
							marginHorizontal: vw(5),
							fontSize: 36,
						}}
					>
						<Text>{data.title}</Text>
					</Text>
					{(data.hasVoted || data.result === "passed") ? (
						<View
							style={{
								borderTopWidth: 1,
								borderColor: "green",
								borderBottomWidth: 1,
							}}
						>
							<Text
								style={{
									...styles.BallotTitle,
									fontSize: 20,
									marginTop: vh(0.4),
								}}
							>
								{data.result === "passed" ? "✅ Legislation Passed" : "✅ Status: Voted"}
							</Text>
						</View>
							) : (
							<View
								style={{
									borderTopWidth: 1,
									borderColor: "red",
									borderBottomWidth: 1,
								}}
							>
								<Text
									style={{
										...styles.BallotTitle,
										fontSize: 20,
										marginTop: vh(0.4),
									}}
								>
									{data.result === "failed" ? "❌ Failed to Pass" : "❌ Status: Not Voted"}
								</Text>
							</View>)
					}
					<Text
						style={{
							fontWeight: "bold",
							color: "#cccccc",
							textAlign: "center",
							fontStyle: "italic",
							marginTop: vh(2.5),
							marginBottom: vh(2),
						}}
					>
						"{data.description}"
					</Text>
					<View
						style={{
							...styles.buttonContainer,
							marginLeft: vw(3),
							marginRight: vw(3),
						}}
					>
						<Card>
							{/* <View style={{ alignItems: "center" }}> */}
							<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
								Proposed By:
							</Text>
							<View style={styles.votingInfoTextWrapper}>
								<Text>{data.creator["username"]}</Text>
							</View>
							<View style={styles.votingInfoTextWrapper}>
								<View style={styles.votingBr} />
							</View>
							<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
								Points For:
							</Text>
							{supports}
							<View style={styles.votingInfoTextWrapper}>
								<View style={styles.votingBr} />
							</View>
							<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
								Points Against:
							</Text>
							{against}
							<View style={styles.votingInfoTextWrapper}>
								<View style={styles.votingBr} />
							</View>
							<React.Fragment>
								<Text
									style={{ ...styles.textSubtitleBallot, color: "black" }}
								>
									Threshold to Pass
									</Text>
								{(data.status === "ended") ? (<View style={styles.votingInfoTextWrapper}>
									<Text style={{ fontWeight: "bold", color: (data.result === "passed" ? "green" : "red") }}>{`${
										data.voteThreshold * 100
										}% (${data.votes.support > 0 ? (data.votes.support / (data.votes.against + data.votes.support) * 100).toFixed(2) : "0"}% reached)`}</Text>
								</View>) : (<View style={styles.votingInfoTextWrapper}>
									<Text style={{ fontWeight: "bold", color: "red" }}>{`${
										data.voteThreshold * 100
										}%`}</Text>
								</View>)}
							</React.Fragment>
							<View style={styles.votingInfoTextWrapper}>
								<View style={styles.votingBr} />
							</View>
							<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
								Voter Turnout
							</Text>
							<View style={styles.votingInfoTextWrapper}>
								<Text
									style={{
										...styles.ballotTextContainer,
										fontWeight: "bold",
										color: "green",
									}}
								>{`${((data.totalVotes / data.maxVotes) * 100).toFixed(
									2
								)}%`}</Text>
							</View>
							<View style={styles.votingInfoTextWrapper}>
								<View style={styles.votingBr} />
							</View>
							{data.status === "active" ? (
								<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
									End Date
								</Text>
							) : (
								<Text style={{ ...styles.textSubtitleBallot, color: "black" }}>
									Ended
								</Text>
							)}
							<View style={styles.votingInfoTextWrapper}>
								<Text style={styles.ballotTextContainer}>
									{moment(data.endTime).format("MMMM Do YYYY [at] h:mm:ss a")} (
									{moment(data.endTime).fromNow()})
								</Text>
							</View>
							{/* </View> */}
						</Card>
						{data.status === "active" ? (
							<Button
								text="Add New Argument"
								onPress={() =>
									props.navigation.navigate("AddPoint", {
										_id: props.navigation.getParam("_id"),
									})
								}
							/>
						) : null}
						{!data.hasVoted && data.status === "active" ? (
							<Button
								text="Vote!"
								onPress={() =>
									props.navigation.navigate("Vote", {
										des: data.title,
										_id: props.navigation.getParam("_id"),
									})
								}
							/>
						) : null}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
