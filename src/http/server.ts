import fastify from "fastify";
import { createPoll } from "./routes/CreatePoll";
import { getPoll } from "./routes/GetPoll";
import { voteOnPoll } from "./routes/VoteOnPoll";
import { pollResults } from "./ws/PollResults";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";

const app = fastify();
const port: string | number = process.env.PORT || 3333;

app.register(cookie, {
  secret: "generatedSecretKey",
  hook: "onRequest",
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen(
  {
    port: Number(port),
  },
  (err: Error | null, address: string): void => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is up on port ${port} 🚀`);
  },
);
