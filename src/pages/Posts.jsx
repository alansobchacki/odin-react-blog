import { useEffect } from "react";

const Posts = () => {
  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token")
    const userData = JSON.parse(currentUser);

    console.log("current user:" + currentUser);
    console.log("does it have a token?" + token);
    console.log("is admin?" + userData.admin);
  }, []);

  return (
    <>
      <p>
        whoa mama
        check your CONSOLE;
      </p>
    </>
  );
};

export default Posts;
