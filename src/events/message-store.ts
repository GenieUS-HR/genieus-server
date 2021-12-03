export type Message = {
  authorID: string;
  content: string;
  postedDate: Date;
};

class InMemoryMessageStore {
  messages: Map<string, Message[]>;

  constructor() {
    this.messages = new Map();
  }

  getMessages(HelpRequestID: string) {
    return this.messages.get(HelpRequestID);
  }

  saveMessage(HelpRequestID: string, message: Message) {
    const priorMessages = this.messages.get(HelpRequestID);
    const messages = [...priorMessages, message];
    this.messages.set(HelpRequestID, messages);
  }
}

export default InMemoryMessageStore;
