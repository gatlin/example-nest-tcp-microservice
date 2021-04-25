import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class ShutdownService implements OnModuleDestroy {
  private shutdownListener$: Subject<void> = new Subject();

  // Feel free (encouraged, even) to override this method!
  onModuleDestroy() {
    console.log("Shutting down ...");
  }

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn());
  }

  shutdown() {
    this.shutdownListener$.next();
  }
}
