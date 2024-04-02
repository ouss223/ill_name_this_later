import { useEffect, useState } from "react";

const BlogPosts = ({ auth }) => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    async function getBlogPosts() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/getblogpost.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }

    getBlogPosts();
  }, []);

  return (
    <div className="text-white max-w-[1300px] mx-auto ">
      <h1 className="text-6xl ml-12 mb-12 alegreya-bold">Blog Posts</h1>
      <div className="flex flex-col  mx-12 ">
        {
          posts &&
          posts.map((post) => (
            <div className="flex flex-row justify-between border-b border-dark-pink py-4">
              <div className="space-y-2 ">
                <h1 className="alegreya-normal text-glowy-pink text-[38px]  ">
                  {post.title}
                </h1>
                <h3 className="abel text-gray-400 text-[18px]">
                  {post.timestamp}
                </h3>
                <p className="abel text-[23px]">
                  {post.content}
                </p>
              </div>
              <img src={post.image} className="h-[200px]" />
            </div>
          ))
        }</div>




    </div>
  );
};
//random random random random random random random random
export default BlogPosts;
