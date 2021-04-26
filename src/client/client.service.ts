import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CLIENT_SERVICE_ID } from "./client.constants";

@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_SERVICE_ID) private readonly client: ClientProxy
  ) {}

  emitAhoy(): Observable<string> {
    console.log("emitting event: ahoy");
    return this.client.emit<string>("EvtAhoy", "the client");
  }

  // this sends a message over TCP to the server
  requestHello(): Observable<string> {
    console.log("sending request for hello");
    return this.client.send<string>("CmdHello", "");
  }
}
