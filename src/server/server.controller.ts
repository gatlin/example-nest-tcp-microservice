import { Controller } from "@nestjs/common";
import { MessagePattern, EventPattern } from "@nestjs/microservices";
import { ServerService } from "./server.service";
import { Observable } from "rxjs";

@Controller()
export class ServerController {
  constructor(private readonly appService: ServerService) {}

  @EventPattern("EvtAhoy")
  async handleAhoy(matey: string) {
    this.appService.ahoy(matey);
  }

  @MessagePattern("CmdHello")
  getHello(data: string): Observable<string> {
    console.log(`data: ${data}`);
    const obs = new Observable<string>((subscriber) => {
      subscriber.next(this.appService.hello());
      subscriber.complete();
    });
    return obs;
  }
}
