import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerService {
  ahoy(matey: string) {
    console.log(`"ahoy" broadcast from ${matey}`);
  }

  hello(): string {
    return "Hello from the server!";
  }
}
