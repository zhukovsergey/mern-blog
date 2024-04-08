import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import "moment/locale/ru";
moment.locale("ru");
export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-500 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
        />
      </div>
      <div className="flex-1">
        <div className=" flex items-center mb-1">
          <span className="font-bold mr-1 text-xs">
            {user ? `@${user.username}` : "Анонимный пользователь"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="dark:text-gray-300 text-gray-500 pb-2">
          {comment.content}
        </p>
        <div>
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
