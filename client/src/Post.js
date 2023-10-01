import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, username ,author }) {
  return (
    <div className="relative max-w-sm bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-100 dark:border-gray-200">
      <Link to={`/post/${_id}`}>
        <img className="rounded-t-lg w-full h-50" src={`http://localhost:4000/${cover}`} alt={title} />
      </Link>
      <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md dark:bg-gray-100">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-500">{author.username}</span>
      </div>
      <div className="p-4">
        <Link to={`/post/${_id}`}>
          <h5 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-800">{title}</h5>
        </Link>
        <p
          className="mb-3 text-gray-600 dark:text-gray-500"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3, // Number of lines to display before truncating
          }}
        >
          {summary}
        </p>
        <Link
          to={`/post/${_id}`}
          className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-2 dark:focus:ring-blue-200"
        >
          Read more
          <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
