import { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.ok) {
          // Post deleted successfully, you can navigate to a different page or perform any other action.
          alert('Post deleted successfully.');
          setRedirect(true);
        } else {
          alert('Error deleting the post.');
        }
      } catch (error) {
        console.error('An error occurred while deleting the post:', error);
      }
    }
  };

  if (!postInfo) {
    return (
      
      <div class="fixed inset-0 flex items-center justify-center">
        <div class="flex items-center justify-center w-full h-full object-cover bg-gray-50">
          <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">Loading...</div>
        </div>
      </div>
    


    )
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="post-page container mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
      <div className="text-left mb-2 text-gray-500">
        {formatISO9075(new Date(postInfo.createdAt))}
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">{postInfo.title}</h1>
      <div className="text-center italic text-gray-600 mt-2">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row mt-4 flex justify-between items-center">
          <Link
            className="edit-btn text-blue-500 hover:underline"
            to={`/edit/${postInfo._id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
          <button
            className="delete-btn text-red-500 hover:underline"
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete this post
          </button>
        </div>
      )}
      <div className="image mt-4 ">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />
      </div>
      <div
        className="content mt-4 text-gray-800"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
