import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import React from "react";

//pages
import Welcome from "../pages/welcome";
import Login from "../pages/login";
import Organizations from "../pages/organizations";
import OrganizationDetails from "../pages/organizationDetails";
import Registration from "../pages/registration";
import CreateOrg from "../pages/createOrganization";
import TOS from "../pages/TOS";
import userProfile from "../pages/userProfile";
import votingPage from "../pages/votingPage";
import Vote from "../pages/vote";
import createBallot from "../pages/createBallot";
import AddPoint from "../pages/addPoint";
import ballotList from "../pages/ballotList";

//Main Stack Navigator (all screens listed below get access to navigate prop)
//Screen on top is displayed first
const screens = {
	Welcome: {
		screen: Welcome,
	},
	Login: {
		screen: Login,
	},
	Register: {
		screen: Registration,
	},
	Organizations: {
		screen: Organizations,
	},
	CreateOrganization: {
		screen: CreateOrg,
	},
	OrganizationDetails: {
		screen: OrganizationDetails,
	},
	Registration: {
		screen: Registration,
	},
	TOS: {
		screen: TOS,
	},
	Profile: {
		screen: userProfile,
	},
	votingPage: {
		screen: votingPage,
	},
	Vote: {
		screen: Vote,
	},
	createBallot: {
		screen: createBallot,
	},
	AddPoint: {
		screen: AddPoint,
	},
	ballotList: {
		screen: ballotList,
	},
};

const mainStack = createStackNavigator(screens, {
	headerMode: "none",
	navigationOptions: {
		headerVisible: false,
		gesturesEnabled: false,
	},
});

//createAppContainer compresses stackNavigator into a component that can be imported
export default createAppContainer(mainStack);
