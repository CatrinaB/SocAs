import React from "react";
import DashboardCard from "../components/DaschboardCard";
import { Container } from "@material-ui/core";
import DashboardPostCard from "../components/DashboardPostCard";


const Mock = () => {
	return (
		<Container>
			<DashboardPostCard/>
			<DashboardCard
				user={{ fullName: "Catrina Bodean", profileImageSource: "http://localhost:3000/avatars/cati.jpg" }}
				content={"I need some help, please!"}
				date={"17.06.2020 23:45"}
			/>
			<DashboardCard
				user={{ fullName: "Manuel Dragomir", profileImageSource: "http://localhost:3000/avatars/manu.jpg" }}
				content={"I need some help, please!"}
				date={"17.06.2020 21:55"}
			/>
			<DashboardCard
				user={{ fullName: "Ciobanu Paul", profileImageSource: "http://localhost:3000/avatars/ciobi.jpg" }}
				content={"I need some help, please!"}
				date={"17.06.2020 16:21"}
			/>
			<DashboardCard
				user={{ fullName: "Florin Pricop", profileImageSource: "http://localhost:3000/avatars/florin.jpg" }}
				content={"I need some help, please!"}
				date={"16.06.2020 20:33"}
			/>
			<DashboardCard
				user={{ fullName: "Tudor Citiriga", profileImageSource: "http://localhost:3000/avatars/tudor.jpg" }}
				content={"I need some help, please!"}
				date={"16.06.2020 13:45"}
			/>
		</Container>
	)
}

export default Mock;
