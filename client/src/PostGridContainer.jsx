import React from 'react';
import Post from './Post'; // Import the PostGrid component

export default function PostGridContainer({ posts }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}
