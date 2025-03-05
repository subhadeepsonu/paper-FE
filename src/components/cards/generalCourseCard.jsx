import React from "react";

export default function GeneralCoursesCard({ courseCode, courseName }) {
    return (
        <div className="flex flex-col w-full padding-4 shadow-lg m-8 p-4 rounded-2xl border border-gray-300 bg-yellow-100">
            <h2>Course Code : {courseCode}</h2>
            <h2>Course Name : {courseName}</h2>

            <button className="mt-4 bg-blue-500 w-1/2 m-auto">
                <a href={`/faculty/courses / ${courseCode}`}>View Course</a>
            </button>
        </div >
    );
};

