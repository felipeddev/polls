import fastify from "fastify";
import {createPoll} from "./routes/CreatePoll";

const app = fastify();

app.register(createPoll)
app.listen({port: 3000}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
