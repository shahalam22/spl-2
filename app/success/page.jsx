"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { useAppDispatch } from "@/redux/hooks";
import { fetchNotifications } from "@/redux/features/notificationSlice";

const SuccessPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [sessionId, setSessionId] = useState(null);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSessionId(searchParams.get("session_id"));
    setPostId(searchParams.get("post_id"));
  }, []);

  useEffect(() => {
    if (sessionId && postId) {
      dispatch(fetchNotifications());
      setTimeout(() => router.push(`/resources`), 3000);
    }
  }, [sessionId, postId, dispatch, router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Payment Successful!</h1>
      <p>You will be redirected shortly...</p>
    </div>
  );
};

export default SuccessPage;
