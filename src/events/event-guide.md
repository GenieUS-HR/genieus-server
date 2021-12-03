## Chat (client)

---

### Join chat

- emit `join help request` when joining chat room send helpRequest ID

  - on `existing messages` load initial chat messages
  - on `user joined chat` show notification

---

### Post Message

- emit `post message` send help request id and message ({content:string, authorID: string, postedDate: Date})

  - on `get message` add message to state & display

---

### Leave chat

- emit `leave help request` when leaving chat room send help request id
  - on `user left chat` show notification
