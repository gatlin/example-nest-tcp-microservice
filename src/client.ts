import { NestFactory } from "@nestjs/core";
import { ClientModule } from "./client/client.module";
import { ClientService } from "./client/client.service";
import { ShutdownService } from "./shutdown.service";

async function bootstrap() {
  const client = await NestFactory.createApplicationContext(ClientModule);
  const clientService = client.get(ClientService);
  const shutdownService = client.get(ShutdownService);
  const subscription = clientService.getHello().subscribe({
    next(x) {
      console.log(`got value: ${x}`);
      clientService.ahoy();
    },
    error(err) {
      console.error(`something happened: ${err}`);
    },
    complete() {
      shutdownService.shutdown();
    }
  });
  shutdownService.subscribeToShutdown(() => {
    client.close();
    subscription.unsubscribe();
  });
}

bootstrap();
