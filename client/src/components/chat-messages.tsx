export default function ChatMessages({ messages, socketId }) {
  return (
    <div className="messages-area">
      {messages.length === 0 && (
        <p className="placeholder">No messages yet...</p>
      )}

      {messages.map((msg, ind) => (
        <div
          key={ind}
          className={
            msg.room === socketId ? "chat-bubble-you" : "chat-bubble-sender"
          }
        >
          <p>{msg.msg}</p>
        </div>
      ))}
    </div>
  );
}
