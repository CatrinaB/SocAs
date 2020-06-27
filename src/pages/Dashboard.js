import React from "react";
import DashboardCard from "../components/DaschboardCard";
import { Container } from "@material-ui/core";
import DashboardPostCard from "../components/DashboardPostCard";
import { getAllPosts } from "../queries";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        getAllPosts(this);
    }

    rerenderParent = () => {
        getAllPosts(this);
    };

    render() {
        return (
            <Container>
                <div>
                    <DashboardPostCard />
                    {this.state.posts.map((post) => {
                        return (
                            <DashboardCard
                                key={Math.random() * 89}
                                author={{
                                    fullName: post.authorName,
                                    profileImageSource:
                                        "http://localhost:3000/avatars/u1.jpg"
                                }}
                                text={post.text}
                                timePosted={post.timePosted}
                                comments={post.comments}
                                rerenderParent={this.rerenderParent}
                            />
                        );
                    })}
                </div>
            </Container>
        );
    }
}

export default Dashboard;
