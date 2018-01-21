class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe = (topic, subscriber) => {
    const subscribers = this.topics[topic]
      ? this.topics[topic].filter(s => s !== subscriber)
      : [];
    this.topics[topic] = subscribers.concat(subscriber);
    return {
      unsubscribe: () => {
        this.topics[topic] = this.topics[topic].filter(s => s !== subscriber);
      }
    };
  };

  publish = (topic, message) => {
    const subscribers = this.topics[topic] || [];
    subscribers.forEach(subscriber => subscriber(message));
  };
}

// driver code

const pubSub = new PubSub();

const sub1 = message => {
  console.log(`Sub 1 doing somethig with with ${message}`);
};

const sub2 = message => {
  console.log(`Sub 2 doing somethig with with ${message}`);
};

const subscriptionOne = pubSub.subscribe("topic1", sub1);
const subscriptionsTwo = pubSub.subscribe("topic1", sub2);

// publish something to topic1 now
pubSub.publish("topic1", "Tomorrow Surprise test");

subscriptionOne.unsubscribe();

pubSub.publish("topic1", "Tomorrow Surprise test after unsubscribing");
