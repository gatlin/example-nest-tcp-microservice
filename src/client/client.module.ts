import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientService } from "./client.service";
import { ShutdownService } from "../shutdown.service";
import { CLIENT_SERVICE_ID } from "./client.constants";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CLIENT_SERVICE_ID,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 1888
        }
      }
    ])
  ],
  providers: [ClientService, ShutdownService]
})
export class ClientModule {}
