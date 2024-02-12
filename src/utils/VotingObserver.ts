type VoteMessage = {
  pollOptionId: string;
  votes: number;
};
interface VotingSubscriber {
  pollId: string;
  update(message: VoteMessage): void;
}

class VotingProvider {
  private subscribers: VotingSubscriber[] = [];

  public subscribe(subscriber: VotingSubscriber): void {
    if (this.subscribers.some((s) => s.pollId === subscriber.pollId)) {
      throw new Error("Already subscribed");
    }
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriber: VotingSubscriber): void {
    this.subscribers = this.subscribers.filter(
      (s) => s.pollId !== subscriber.pollId,
    );
  }

  public notify(pollId: string, message: VoteMessage): void {
    if (!this.subscribers.some((s) => s.pollId === pollId)) {
      return;
    }

    for (const subscriber of this.subscribers) {
      if (subscriber.pollId === pollId) {
        subscriber.update(message);
      }
    }
  }
}

export const votingProvider = new VotingProvider();
