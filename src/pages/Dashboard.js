import React from "react";
import DashboardCard from "../components/DaschboardCard";
import { Container } from "@material-ui/core";
import DashboardPostCard from "../components/DashboardPostCard";
import { getAllPosts, getUserName } from "../queries";
import {connect} from "react-redux"
import logger from "../utils/logger";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
		getAllPosts(this);
		console.log('fmmmmm', this.props.userId)
		
		getUserName(this.props.userType, this.props.userId);
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
                                key={post._id}
                                postID={post._id}
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

const mapStateToProps = (state) => {
    return {
        userType: state.auth.userType,
		userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Dashboard);

