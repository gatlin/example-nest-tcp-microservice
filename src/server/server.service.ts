import { Injectable } from "@nestjs/common";

@Injectable()
export class ServerService {
  ahoy(matey: string) {
    console.log(`"ahoy" was broadcasted from ${matey}`);
  }

  getHello(): string {
    return "Hello, World!";
  }
}
