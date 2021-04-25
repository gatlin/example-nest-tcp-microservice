import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { ServerService } from "./server.service";
import { Observable } from "rxjs";

@Controller()
export class ServerController {
  constructor(private readonly appService: ServerService) {}

  @MessagePattern({ cmd: "getHello" })
  getHello(data: string): Observable<string> {
    console.log(`data: ${data}`);
    const obs = new Observable<string>((subscriber) => {
      subscriber.next(this.appService.getHello());
      subscriber.complete();
    });
    return obs;
  }
}
