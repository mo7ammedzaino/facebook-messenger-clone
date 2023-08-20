import { Card, CardContent, Typography } from "@mui/material";
import "../css/Message.css";
import { forwardRef } from "react";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = message.username === username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography colors="white" variant="h5" component="h2">
            {!isUser && `${message.username || "Unknow User"}:  `}
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
