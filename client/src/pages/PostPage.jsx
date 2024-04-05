import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);
  return <div>Post</div>;
}
