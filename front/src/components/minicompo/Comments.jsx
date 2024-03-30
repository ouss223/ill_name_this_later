import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAvatar } from "../../AvatarContext";

const Comments = ({ auth, id, season, episode }) => {
  const [commentsGlobal, setCommentsGlobal] = useState([]);
  const [notice, setNotice] = useState(false);
  const urls = [
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/8-Employee-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/40-School_boy-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/5-Manager-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-07-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/12-Delivery_Man-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-13-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/30-Scientist-512.png",
    "https://cdn2.iconfinder.com/data/icons/avatars-60/5985/29-Software_Assistant-512.png",
    "https://cdn4.iconfinder.com/data/icons/avatars-2-12/512/Avatar_2-26-512.png",
  ];

  return (
    <div className="text-white">
      <AddComment
        auth={auth}
        id={id}
        setNotice={setNotice}
        urls={urls}
        episode={episode}
        season={season}
      />
      <CommentList
        auth={auth}
        id={id}
        setCommentsGlobal={setCommentsGlobal}
        notice={notice}
        urls={urls}
        episode={episode}
        season={season}
      />
    </div>
  );
};

const AddComment = ({ auth, id, setNotice, urls, episode, season }) => {
  const [comment, setComment] = useState("");
  const [add, setAdd] = useState(false);
  const { avatarId, updateAvatarId } = useAvatar();

  useEffect(() => {
    async function addComment() {
      try {
        setAdd(false);
        await fetch("http://localhost:8000/api/addComment.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth,
          },
          body: JSON.stringify({
            show_id: id,
            comment: comment,
            episode: episode,
            season: season,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
        setNotice((prev) => !prev);
        setComment("");
      } catch (e) {
        console.log(e);
      }
    }
    if (add) {
      addComment();
      setAdd(false);
    }
  }, [add]);

  return (
    <div className="border-b border-glowy-pink pb-10  max-w-[850px] w-10/12 mx-auto relative">
      <h1 className="text-glowy-pink  text-4xl font-semibold "> Comments :</h1>
      <div className=" text-white flex flex-row mx-auto w-full gap-4 text-center my-10  ">
        <img src={urls[avatarId]} className="h-16" />
        <input
          type="text"
          className="p-1  w-full text-glowy-pink bg-black placeholder-pink-800 text-2xl"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a Comment "
          style={{ outline: "none" }}
        />
        <button
          className="w-[100px]  mx-auto  bg-glowy-pink absolute right-0 bottom-5"
          onClick={() => {
            if (comment !== "") {
              setAdd(true);
            }
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};
const CommentList = ({
  auth,
  id,
  setCommentsGlobal,
  notice,
  urls,
  season,
  episode,
}) => {
  const [comments, setComments] = useState([]);
  const [changement, setChangement] = useState(false);
  const [call, setCall] = useState(false);
  const [comment_id, setComment_id] = useState("");
  const [comment, setComment] = useState("");
  const [add, setAdd] = useState(true); // only for appearence
  const [modifying_id, setModifying_id] = useState("");
  const { avatarId, updateAvatarId } = useAvatar();
  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getComments.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({
              show_id: id,
              season: season,
              episode: episode,
            }),
          }
        );
        const data = await response.json();
        setComments(data);
        setCommentsGlobal(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
    getComments();
  }, [notice, id, season, episode]);
  function deleteCommentLocally(comment_id_local) {
    const newComments = comments.filter((comment) => {
      return comment.id !== comment_id_local;
    });
    setComments(newComments);
  }
  function modifyCommentLocally(newComment) {
    const newComments = comments.map((comment) => {
      if (comment.id === comment_id) {
        return {
          ...comment,
          content: newComment,
        };
      }
      return comment;
    });
    setComments(newComments);
  }

  useEffect(() => {
    async function changeComment() {
      if (!changement) return;
      if (!call) return;
      setCall(false);
      try {
        const response = await fetch(
          `http://localhost:8000/api/modifyComment.php`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({
              show_id: id,
              comment_id: comment_id,
              operation: changement,
              new_comment: comment,
              episode: episode,
              season: season,
            }),
          }
        );
        console.log(comment_id, changement, comment);
        const data = await response.json();
        console.log(data);
        if (changement === "delete") {
          deleteCommentLocally(comment_id);
        }
        if (changement === "edit") {
          modifyCommentLocally(comment);
        }
      } catch (e) {
        console.log(e);
      }
    }
    changeComment();
  }, [call]);
  return (
    <div className="mt-10">
      <div className=" text-start  flex flex-col  w-10/12 gap-4  text-white max-w-[850px] mx-auto">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div
                key={comment.id}
                className="bg-black p-2 flex-col border-b border-dark-pink w-full"
              >
                {comment.id === modifying_id && add ? (
                  <InputComment
                    setComment={setComment}
                    setAdd={setAdd}
                    text="Modify"
                    setCall={setCall}
                    urls={urls}
                    value={comment.content}
                  />
                ) : (
                  <>
                    <div className="flex flex-row gap-4 items-center">
                      <img src={urls[3]} className="h-16" alt="" />
                      <div>
                        {" "}
                        <h1 className="text-2xl font-semibold">
                          {comment.username}
                        </h1>
                        <h1 className="text-gray-500">{comment.timestamp}</h1>
                      </div>
                    </div>

                    <h1 className="mt-2 text-xl ">{comment.content}</h1>
                    {comment.own && (
                      <div className="flex justify-end">
                        <EditIcon
                          onClick={() => {
                            setModifying_id(comment.id);
                            setComment_id(comment.id);
                            setComment(comment.content);
                            setChangement("edit");
                            setAdd(true);
                          }}
                        />
                        <DeleteIcon
                          onClick={() => {
                            setComment_id(comment.id);
                            setChangement("delete");
                            setCall(true);
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const InputComment = ({ setComment, setAdd, text, setCall, urls,value }) => {
  const [local_comment, setLocal_comment] = useState(value);
  const { avatarId, updateAvatarId } = useAvatar();
  return (
    <div className="pb-10 max-w-[850px]  relative">
      <div className="text-white flex flex-row mx-auto w-full gap-4 text-center ">
        <input
          type="text"
          className="p-1 w-full text-glowy-pink bg-black placeholder-pink-800 text-2xl"
          value={local_comment}
          onChange={(e) => {
            setLocal_comment(e.target.value);
            setComment(e.target.value);
          }}
          placeholder="add a new Comment instead"
          style={{ outline: "none" }}
        />
        <button
          className="w-[100px] mx-auto bg-glowy-pink absolute right-0 bottom-5"
          onClick={() => {
            if (local_comment !== "") {
              setCall(true);
              setAdd(false);
            }
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comments;
