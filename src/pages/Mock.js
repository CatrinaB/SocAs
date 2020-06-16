import React from "react";
import DashboardCard from "../components/DaschboardCard";
import { Container } from "@material-ui/core";
import DashboardPostCard from "../components/DashboardPostCard";
import FriendCard from "../components/FriendCard";
import FriendRequestCard from "../components/FriendRequestCard";


const Mock = () => {
	return (
		<Container>
			<div>
				<DashboardPostCard/>
				<DashboardCard
					user={{ fullName: "Herbert Betts", profileImageSource: "http://localhost:3000/avatars/u1.jpg" }}
					content={"Did we move to the tropics and I'm not aware? Only rain, sun, heat, and rain..."}
					date={"17.06.2020 23:45"}
				/>
				<DashboardCard
					user={{ fullName: "Ayush Rocha", profileImageSource: "http://localhost:3000/avatars/u2.jpg" }}
					content={"Does anybody have experience with guide dogs? I'm thinking about trying to get one, and I'd like to hear some stories from people who already have guide dogs"}
					date={"17.06.2020 21:55"}
				/>
				<DashboardCard
					user={{ fullName: "Iestyn Mccartney", profileImageSource: "http://localhost:3000/avatars/u3.jpg" }}
					content={"Hey, check this app! It's for people in wheelchairs, but people going on a walk with baby strollers can use it too! It shows you wheelchair accessible places, it's really nice and quite easy to use! I recommend! https://wheelmap.org/" +
					"P.S. It's also on mobile ;)"}
					date={"17.06.2020 16:21"}
				/>
				<DashboardCard
					user={{ fullName: "Mikaela Monroe", profileImageSource: "http://localhost:3000/avatars/u4.jpg" }}
					content={"I woke up and found my fridge warm, and it wouldn't start back up again no matter what I do. Anyone encountered this problem? It's a Phillips 4000"}
					date={"16.06.2020 20:33"}
				/>
				<DashboardCard
					user={{ fullName: "Rosemary Tomlinson", profileImageSource: "http://localhost:3000/avatars/u5.jpg" }}
					content={"I have a bunch of coloured pencils and some pens my daughter \"is too old\" for, I'm pretty sure they were never used. Do you need them or know anyone who does?"}
					date={"16.06.2020 13:45"}
				/>
				<DashboardCard
					user={{ fullName: "Lorem Ipsum", profileImageSource: "http://localhost:3000/avatars/cati.jpg" }}
					content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas diam quam, viverra quis velit eu, gravida consectetur erat. Pellentesque condimentum faucibus tempor. Sed et rhoncus libero. Donec posuere, nisi ut feugiat tincidunt, eros nibh luctus mauris, sit amet blandit ipsum enim in mi. Duis imperdiet porta lectus nec viverra. Morbi tempor nisi vitae nisi tincidunt gravida. Nam imperdiet justo lobortis quam auctor varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ac odio sed enim viverra posuere at vel velit. Phasellus mattis dapibus lacus, vitae varius sem sodales id. Nullam sed odio at velit semper tincidunt eu lacinia dui. Etiam ut magna mi. Sed quis scelerisque elit. Donec in risus maximus ipsum tincidunt imperdiet.Nulla auctor est id ex sodales sagittis. Ut eget imperdiet risus. Morbi sagittis sem lorem, ac blandit elit elementum ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis vitae ligula tortor. Etiam commodo odio malesuada, luctus nulla ac, aliquet eros. Pellentesque malesuada congue libero, nec rutrum odio finibus ut. Aenean laoreet ultrices purus, in semper ligula vulputate sit amet. Mauris sit amet sem a sapien finibus aliquet sit amet eget elit. Curabitur molestie dui sem, quis hendrerit tellus hendrerit sed. Morbi tempor lobortis euismod. Praesent ut dolor non massa maximus cursus. Praesent cursus urna a maximus dictum. Nulla viverra tellus vitae felis pulvinar convallis. "}
					date={"16.06.1999 22:45"}
				/>
			</div>
			<div>
				<FriendCard user={{ fullName: "Vikki Rowland", profileImageSource: "http://localhost:3000/avatars/u6.jpg" }}/>
				<FriendCard user={{ fullName: "Benito Villalobos", profileImageSource: "http://localhost:3000/avatars/u8.jpg" }}/>
				<FriendCard user={{ fullName: "Minnie Driscoll", profileImageSource: "http://localhost:3000/avatars/u7.jpg" }}/>
			</div>
			<div>
				<FriendRequestCard user={{ fullName: "Rachel Mcclure", profileImageSource: "http://localhost:3000/avatars/u11.jpg" }}/>
				<FriendRequestCard user={{ fullName: "Yusuf Schmitt", profileImageSource: "http://localhost:3000/avatars/u9.jpg" }}/>
				<FriendRequestCard user={{ fullName: "Glenn Farrow", profileImageSource: "http://localhost:3000/avatars/u10.jpg" }}/>
			</div>
		</Container>
	)
}

export default Mock;
