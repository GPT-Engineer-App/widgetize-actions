import React, { useState } from "react";
import { ChakraProvider, Box, Grid, Text, Input, Button, VStack, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast, Select } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
const Widget = ({ id, title, action, type, onDelete }) => {
  let content;
  let actionContent;
  switch (type) {
    case "textbox":
      content = <Input mt={2} placeholder="Enter text" />;
      break;
    case "rectangle":
      content = <Box mt={2} w="100%" h="50px" bg="gray.200" />;
      break;
    case "circle":
      content = (
        <Box mt={2} w="100px" h="100px" mx="auto" position="relative">
          <Button w="100%" h="100%" borderRadius="50%" bg="gray.200" />
          <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" fontWeight="bold">
            {title}
          </Text>
        </Box>
      );
      break;
    default:
      content = null;
      actionContent = null;
  }
  return (
    <VStack>
      <HStack w="100%" justify="space-between">
        <Text fontWeight="bold">{title}</Text>
        <IconButton icon={<FaTrash />} onClick={() => onDelete(id)} variant="ghost" />
      </HStack>
      {content}
    </VStack>
  );
};

const Index = () => {
  const [widgets, setWidgets] = useState([]);
  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetAction, setWidgetAction] = useState("");
  const [selectedType, setSelectedType] = useState("textbox");
  const types = ["textbox", "rectangle", "circle"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addWidget = () => {
    if (widgetTitle.trim() === "") {
      toast({
        title: "Error",
        description: "Widget title can't be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setWidgets((prevWidgets) => [...prevWidgets, { id: Math.random(), title: widgetTitle, action: widgetAction, type: selectedType }]);
    setWidgetTitle("");
    setWidgetAction("");
    onClose();
  };

  const deleteWidget = (id) => {
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
  };

  return (
    <ChakraProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg="gray.100">
          <VStack spacing={4}>
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
              Add Widget
            </Button>
            {widgets.map((widget) => (
              <Widget key={widget.id} id={widget.id} title={widget.title} action={widget.action} type={widget.type} onDelete={deleteWidget} />
            ))}
          </VStack>
        </Grid>

        {/* Add Widget Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Widget</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Widget Title" value={widgetTitle} onChange={(e) => setWidgetTitle(e.target.value)} />
              <Select mt={4} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="textbox">Textbox</option>
                <option value="rectangle">Rectangle</option>
                <option value="circle">Circle</option>
              </Select>
              <Input mt={4} placeholder="Action" value={widgetAction} onChange={(e) => setWidgetAction(e.target.value)} />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={addWidget}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
