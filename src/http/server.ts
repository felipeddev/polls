import fastify from "fastify";
import {createPoll} from "./routes/CreatePoll";
import {getPoll} from "./routes/GetPoll";
import {voteOnPoll} from "./routes/VoteOnPoll";
import cookie from "@fastify/cookie";

const app = fastify();

app.register(cookie, {
  secret: "generatedSecretKey",
  hook: 'onRequest'
});

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.listen({port: 3000}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
