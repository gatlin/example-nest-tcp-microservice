import { CustomTransportStrategy, Server } from "@nestjs/microservices";
import {
  SNSClient,
  SubscribeCommand,
  PublishCommand
} from "@aws-sdk/client-sns";

const REGION = "us-east-1";
const Endpoint = "LAMBDA_FUNCTION_ARN";
const Protocol = "lambda";

function asyncForEach(array, callback) {
  let ps = [];
  for (let index = 0; index < array.length; index++) {
    ps.unshift(callback(array[index], index, array));
  }
  Promise.allSettled(ps);
  return;
}

export class SNSServer extends Server implements CustomTransportStrategy {
  private snsClient: SNSClient;

  constructor(
    private readonly options
  ) {
    super();
    this.initializeSerializer(options);
    this.initializeDeserializer(options);
  }

  listen(callback: () => void) {
    this.snsClient = this.createSNSClient();
    this.start(callback());
  }

  public createSNSClient() {
    return new SNSClient({ region: REGION });
  }

  public start(callback) {
    this.bindHandlers();
    callback();
  }

  public bindHandlers() {
    asyncForEach(this.messageHandlers, async (handler, pattern) => {
      if (handler.isEventHandler) {
        try {
          const subscription = await this.snsClient.send(new SubscribeCommand({
            TopicArn: pattern
            Protocol,
            Endpoint
          }));
          console.log(`Subscription ARN ${subscription.subscriptionArn}`);
        }
        catch (error) {
          console.error(error);
        }
      }
    });
  }

  close() {
    console.log('[SNSServer#close] called');
  }
}

/*
const run = async () => {
  try {
    const data = await sns.send(new SubscribeCommand(params));
    console.log(`Subscription ARN is ${data.subscriptionArn}`);
  }
  catch (error) {
    console.error(err, err.stack);
  }
}
run();

  */
