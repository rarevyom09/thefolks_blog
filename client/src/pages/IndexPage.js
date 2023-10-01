import { useEffect, useState } from "react";
import Post from "../Post";
export default function IndexPage(){
    const [posts,setPosts]=useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            });
        })
    } ,[]);
    return(
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 m-9">
            {posts.length>0 && posts.map(post => (
                <Post {...post}/>
            ))}
        </div>
    );
}