import "bootstrap/dist/css/bootstrap.css";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();

  let username;
  const submitContact = async (event) => {
    event.preventDefault();
    username = event.target.username.value;
    router.push(`/profile/${username}`);
  };
  
  return (
    <div className="col-12" style={{ padding: 100 }}>
      <form onSubmit={submitContact}>
        <Text fontSize="lg" mb="3">
          Username:{" "}
        </Text>
        <Input
          id="username"
          name="username"
          required
          placeholder="Enter GitHub  Username"
        />
        <Flex pt="3" gap="2" justifyContent="end">
          <Button bg="palette.200" size="md">
            Clear
          </Button>
          <Button
            _hover={{
              textDecoration: "none",
              bg: "palette.800",
              color: "palette.100",
            }}
            color="palette.100"
            bg="palette.900"
            size="md"
            type="submit"
          >
            Search
          </Button>
        </Flex>
      </form>
    </div>
  );
}
