export const addMessage = `
  mutation addMessage($input: MessageInput!) {
    addMessage(input: $input) {
      name
      email
      message
    }
  }
`;
