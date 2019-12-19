import React from 'react';
const Course = ({course}) => (
    <div className="card" style={{ 'width': '100%', 'marginTop': '10px' }}>
        <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <h6 className="card-subtitle mb-3 text-muted">by {course.author}</h6>
            <h6 className="card-subtitle mb-2 text-muted">topic: {course.topic}</h6>
            <p className="card-text">{course.description}</p>
            <a href={course.url} className="card-link">Go to course ...</a>
        </div>
    </div>
);
export default Course;