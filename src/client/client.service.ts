import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CLIENT_SERVICE_ID } from "./client.constants";

@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_SERVICE_ID) private readonly client: ClientProxy
  ) {}

  ahoy(): Observable<string> {
    return this.client.emit<string>("ahoy", "the client");
  }

  // this sends a message over TCP to the server
  getHello(): Observable<string> {
    return this.client.send<string>({ cmd: "getHello" }, "");
  }
}
