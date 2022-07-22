import React from "react";
import { useRouter } from "next/router";
import { Flex, Link } from "@chakra-ui/react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const RepLink = ({ children }) => (
  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
    <Link px={2} py={1} rounded={"md"} href={children.html_url}>
      {children.name}
    </Link>
  </div>
);

const Wrapper = ({ children, condition }) => {
  return condition ? <p> Repositories Not Found</p> : children;
};

const Repositories = ({ userData }) => {
  const router = useRouter();
  const { username } = router.query;
  const [data, setData] = useState("");
  const [allRepo, setAllRepo] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const callData = async () => {
      if (username) {
        const data = await axios
          .get(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&page=${pageIndex}`
          )
          .then(function (response) {
            return {
              repositories: response.data,
            };
          })
          .catch(function (error) {});
        setData(data);
       
        setAllRepo(userData.users ? userData.users.public_repos : 1);
      }
    };

    callData();
  }, [username, userData, pageIndex]);

  const onChange = (pageIndex) => {
    setPageIndex(pageIndex);
  };

  return (
    <Wrapper condition={userData.users ? userData.users.public_repos == 0 : true }>
      <div className="p-3">
        <div className="">Repositories</div>
        <div className="row py-3">
          {data.repositories
            ? data.repositories.map((link) => (
                <RepLink link={link.name} key={link.html_url}>
                  {link}
                </RepLink>
              ))
            : ""}
        </div>
        <Flex mt={5} justifyContent="center">
          <Pagination
            simple
            defaultCurrent={1}
            total={allRepo}
            onChange={onChange}
            defaultPageSize={6}
          />
        </Flex>
      </div>
    </Wrapper>
  );
};

export default Repositories;
