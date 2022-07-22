import { useRouter } from "next/router";
import axios from "axios";
import { Flex, Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";



const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const [data, setData] = useState("");
  useEffect(() => {
    const callData = async () => {
      if (username) {
        const data = await axios
          .get(`https://api.github.com/users/${username}`)
          .then(function (response) {
            return {
              users: response.data,
            };
          })
          .catch(function (error) {
            // console.log(error);
          });
        setData(data);
        console.log(data);
      }
    };

    callData();
  }, [username]);

  return (
    <>
      <h1 className="p-3">Username Searched: {username}</h1>
      <Flex gap={2} p={2}>
        <div>
          <Avatar m={6} size="2xl" src={data ? data.users.avatar_url : ""} />{" "}
        </div>
        <div>
          <Flex
            className="w-100 h-100"
            gap={8}
            justifyContent="center"
            flexDirection="column"
          >
            <div>
              <span>
                {" "}
                name :{" "}
                <b>{data ? (data.users.name ? data.users.name : " - ") : ""}</b>
              </span>{" "}
            </div>
            <div>
              <span>
                {" "}
                bio :
                <b> {data ? (data.users.bio ? data.users.bio : " - ") : ""}</b>
              </span>{" "}
            </div>
            <div>
              <span>
                {" "}
                Location :{" "}
                <b>
                  {data
                    ? data.users.location
                      ? data.users.location
                      : " - "
                    : ""}
                </b>
              </span>
            </div>{" "}
            <div>
              <span>
                {" "}
                Twitter Username :{" "}
                <b>
                  {data
                    ? data.users.twitter_username
                      ? data.users.twitter_username
                      : " - "
                    : ""}
                </b>
              </span>
            </div>
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default Profile;
