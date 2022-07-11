import { Box, Button, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useEffect } from "react";

type ModalDetailsProps = {
    initialRef:  React.MutableRefObject<any>
    finalRef:  React.MutableRefObject<any>
    isOpen: boolean;
    onClose: () => void;
    pupil: any;
    onOpen: () => void;
}

export function ModalDetails({ finalRef, initialRef, isOpen, onClose, pupil, onOpen }: ModalDetailsProps) {

    useEffect(() => {
      pupil && onOpen()
    }, [pupil])

    return (
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}      >
        <ModalOverlay />
        <ModalContent
          bg="gray.800"
        >
          <ModalHeader color="#F54A48" textAlign="center" fontSize="1.1rem" mt="2rem">Detalhes do aluno</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex direction="column" width="100%" alignItems="flex-end">
                <Flex justifyContent="space-between" width="100%">
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">Nome: </Heading>
                    <Heading fontSize="1rem" >{pupil?.name}</Heading>
                  </Box>
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">CPF: </Heading>
                    <Heading fontSize="1rem" >{pupil?.cpf}</Heading>
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">Celular: </Heading>
                    <Heading fontSize="1rem">{pupil?.telephone}</Heading>
                  </Box>
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">Email: </Heading>
                    <Heading fontSize="1rem">{pupil?.email}</Heading>
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" width="100%">
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">Peso</Heading>
                    <Heading fontSize="1rem">{pupil?.weight} kg</Heading>
                  </Box>
                  <Box mb="2rem">
                    <Heading color="#F54A48" fontSize="1rem" mb="1rem">Altura</Heading>
                    <Heading fontSize="1rem">{pupil?.height} m</Heading>
                  </Box>
                </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter margin="0 auto">
            <Button bg="#F54A48" mr={3}>
              Renovar matrícula
            </Button>
            <Button colorScheme="whiteAlpha" onClick={onClose}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}