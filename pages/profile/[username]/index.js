import { useRouter } from "next/router";
import axios from "axios";
import { Flex, Avatar } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Repositories from "../../../components/repositories/Repositories";

const Wrapper = ({ children, condition }) => {
  return condition ? <p>User Not Found</p>: children;
};

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
              users: response.data ? response.data : response.message,
            };
          })
          .catch(function (error) {});
        setData(data);
      }
    };

    callData();
  }, [username]);

  return (
    <Wrapper condition={data ? data.users.message : true }>

      <h1 className="p-3">Username Searched: {username}</h1>
      <Flex className="row" gap={2} p={2}>
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
          <Flex justifyContent="center">
            <Avatar m={6} size="2xl" src={data ? data.users.avatar_url : ""} />{" "}
          </Flex>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <Flex
            className="w-100 h-100"
            gap={8}
            justifyContent="center"
            flexDirection="column"
          >
            <div>
              <span>
                {" "}
                Name :{" "}
                <b>{data ? (data.users.name ? data.users.name : " - ") : ""}</b>
              </span>{" "}
            </div>
            <div>
              <span>
                {" "}
                Bio :
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
      <Repositories userData={data}></Repositories>
      </Wrapper>
 
  );
};

export default Profile;
