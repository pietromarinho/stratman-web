import { Injectable, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var nvl;

@Injectable()
export class LoaderService {

  private minimalTimeMS = 500;

  private loadQueue: any[] = [];
  private busyListener: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  dequeue(token: string) {
    this.dequeueRequest(token);
  }

  enqueueRequest(request: Observable<Response>): Observable<Response> {

    this.loadQueue.push(request);
    this.busyListener.emit(true);

    const req: any = request;

    return request
      .map(o => this.handleResponse(request, o))
      .catch(err => this.handleError(request, err));
  }

  getListener(): EventEmitter<boolean> {
    return this.busyListener;
  }

  private handleResponse(req: Observable<Response>, obj: Response): Response {

    this.dequeueRequest(req);
    return obj;
  }

  private handleError(req: Observable<Response>, error: Response | any) {

    this.dequeueRequest(req);

    return Observable.throw(error);
  }

  private dequeueRequest(req: any) {

    setTimeout(() => {
      const index = this.loadQueue.indexOf(req, 0);
      if (index > -1) {
        this.loadQueue.splice(index, 1);
      }

      if (this.loadQueue.length === 0) {
        this.busyListener.emit(false);
      }
    }, this.getRemaining(req.lastLoadTime));
  }

  getRemaining(lastLoadTime: Date) {
    return null;
  }

}
