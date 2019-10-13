import { Injectable, EventEmitter } from '@angular/core';
import { MessageType } from 'app/service/toast-notification-service/message-type.enum';
import { ToastService } from 'app/service/toast-notification-service/toast-service/toast.service';

declare const $: any;

@Injectable()
export class ErrorService {

  private listener: EventEmitter<Error> = new EventEmitter();

  constructor(
  ) { }

  public throwError(error: Error) {
    this.toast(error.message, MessageType.ERROR);
  }

  toast(msg: string, type?: MessageType) {
    console.log(msg);
    ToastService.show(msg, type);
  }
}
