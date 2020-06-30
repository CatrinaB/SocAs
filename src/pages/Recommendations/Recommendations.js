import React from 'react';
import RecommendationCard from "../../components/RecommendationCard";
import Paper from "@material-ui/core/Paper";


const Recommendations = () => {
    return (
        <div>
            <Paper style={{ padding: '15px' }}>
                <h2>We believe the following persons could help you</h2>
                <RecommendationCard
                    user={{ fullName: "Rachel Mcclure", profileImageSource: "http://localhost:3000/avatars/u11.jpg" }} />
                <RecommendationCard
                    user={{ fullName: "Yusuf Schmitt", profileImageSource: "http://localhost:3000/avatars/u9.jpg" }} />
                <RecommendationCard
                    user={{ fullName: "Glenn Farrow", profileImageSource: "http://localhost:3000/avatars/u10.jpg" }} />
            </Paper>
        </div>

    )
};

export default Recommendations;
