type UserSession = {
  sessionID: string;
  userID: string;
  connected: boolean;
};

class InMemorySessionStore {
  sessions: Map<string, UserSession>;

  constructor() {
    this.sessions = new Map();
  }

  findSession(id: string) {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: UserSession) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

export default InMemorySessionStore;
