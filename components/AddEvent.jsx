import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";
const AddEvent = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [eventDate, setEventDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleEventCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a new event",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const event = {
      title,
      description,
      status,
      eventDate,
      userId: user.uid,
    };
    await addEvent(event);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    setEventDate("");
    toast({ title: "Event created successfully", status: "success" });
  };
  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option
            value={"pending"}
            style={{ color: "yellow", fontWeight: "bold" }}
          >
            Pending
          </option>
          <option
            value={"completed"}
            style={{ color: "green", fontWeight: "bold" }}
          >
            Completed
          </option>
        </Select>
        <Button
          onClick={() => handleEventCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          colorScheme="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};
export default AddEvent;