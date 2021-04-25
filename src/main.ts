import { NestFactory } from "@nestjs/core";
import { ServerModule } from "./server/server.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
  const server = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServerModule,
    {
      transport: Transport.TCP,
      options: {
        host: "0.0.0.0",
        port: 1888
      }
    }
  );
  server.listen(() => console.log("Microservice is listening"));
}
bootstrap();
