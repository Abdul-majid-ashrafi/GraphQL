import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Course from './course';

const Courses = () => (
    <Query
        query={gql`
      {
        courses {
          id
          title
          author
          description
          topic
          url
        }
      }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.courses.map((currentCourse, index) => (
                <Course course={currentCourse} key={index} />
            ));
            // return data.courses.map(({ id, title, author, description, topic, url }) => (
            //     <div key={id}>
            //         <p>{`${title} by ${author}`}</p>
            //     </div>
            // ));
        }}
    </Query>
);
export default Courses;