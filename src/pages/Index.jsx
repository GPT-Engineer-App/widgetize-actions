import React, { useState } from "react";
import { ChakraProvider, Box, Grid, Text, Input, Button, VStack, HStack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaGripVertical } from "react-icons/fa";
const Widget = ({ id, title, shape, onDelete, children }) => (
  <Box p={3} boxShadow="md" borderRadius={shape === "circle" ? "50%" : "md"} bg="white">
    <HStack justifyContent="space-between" className="drag-handle">
      <Text fontWeight="bold" cursor="move">
        {title}
      </Text>
      <IconButton icon={<FaTrash />} size="sm" onClick={() => onDelete(id)} variant="ghost" />
    </HStack>
    {children}
  </Box>
);

const Index = () => {
  const [widgets, setWidgets] = useState([]);
  const [widgetTitle, setWidgetTitle] = useState("");
  const shapes = ["circle", "square"];
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
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setWidgets((prevWidgets) => [...prevWidgets, { id: Math.random(), title: widgetTitle, shape: randomShape }]);
    setWidgetTitle("");
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
              <Widget key={widget.id} id={widget.id} title={widget.title} shape={widget.shape} onDelete={deleteWidget}>
                {/* Placeholder content for the widget */}
                <Text mt={2}>This is a widget</Text>
              </Widget>
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
