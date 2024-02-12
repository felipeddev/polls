import { FastifyInstance } from "fastify";
import { z } from "zod";
import { votingProvider } from "../../utils/VotingObserver";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollParams.parse(request.params);

      votingProvider.subscribe({
        pollId,
        update: (message) => {
          connection.socket.send(JSON.stringify(message));
        },
      });
    },
  );
}
