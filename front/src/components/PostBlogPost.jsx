import { useState, useEffect } from "react";
import image from "../assets/image.png";
import { useNavigate } from "react-router-dom";
const PostBlogPost = ({ auth }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [go, setGo] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file)); // Set the image URL for preview
  };

  useEffect(() => {
    async function postBlog() {
      try {
        if (!go) return;
        setGo(false);
        if (!title || !content || !imageFile) return;

        const reader = new FileReader();
        reader.onload = function () {
          const base64Image = reader.result.split(",")[1]; // Extract the Base64 image data
          fetch("http://localhost:8000/api/postblogpost.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({
              title: title,
              content: content,
              image: base64Image, // Include the Base64 image in the request body
            }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        };

        reader.readAsDataURL(imageFile); // Read the image file as Data URL
        navigate("/message/2");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    postBlog();
  }, [go]);

  return (
    <div className="alegreya-normal text-white flex flex-row mx-auto max-w-[1200px] relative pb-20">
      <div className="flex flex-col gap-40 w-4/6 mx-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          className="bg-black text-4xl text-glowy-pink placeholder:text-pink-600 border-b border-dark-pink"
          style={{ resize: "none", outline: "none" }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          cols="30"
          rows="10"
          className="bg-black text-2xl text-glowy-pink placeholder:text-pink-600 border-b border-dark-pink"
          style={{ resize: "none", outline: "none" }}
        ></textarea>
      </div>
      <div className="flex  h-50 items-center justify-center text-white bg-black rounded-md overflow-hidden w-2/6 relative border-dark-pink border">
        <input
          accept="image/*"
          type="file"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          onChange={handleImageChange}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className=" object-cover" />
        )}
        {!imageUrl && (
          <div className="flex items-center flex-col">
            <img src={image} className="h-24 mr-2" />{" "}
            <span className="text-3xl text-dark-pink">Upload Image</span>
          </div>
        )}
      </div>
      <button
        className="absolute right-10 bottom-0 bg-glowy-pink px-4 text-xl text-black font-semibold"
        onClick={() => setGo(true)}
      >
        {" "}
        Post{" "}
      </button>
    </div>
  );
};

export default PostBlogPost;
