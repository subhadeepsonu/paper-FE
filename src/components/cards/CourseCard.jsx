import React from 'react';

const CourseCard = ({ courseName, questionPaper }) => {
    return (
        <div className="w-full max-w-md p-4 shadow-lg rounded-2xl border border-gray-300 bg-white">
            <div className="mb-2">
                <h2 className="text-xl font-semibold">{courseName}</h2>
            </div>
            <div>
                {questionPaper ? (
                    <div className="bg-green-100 p-3 rounded-lg border border-green-400">
                        <p className="text-green-700 font-medium">Your course has been Created Created</p>
                    </div>) :
                    (<div className="bg-blue-100 p-3 rounded-lg border border-red-400">
                        <p className="text-red-700 font-medium">You are not alloted any Courses</p>
                        <button className="bg-green-500 text-white px-4 py-2 mt-4 cursor-pointer rounded-lg">View QuestionPaper</button>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default CourseCard;
