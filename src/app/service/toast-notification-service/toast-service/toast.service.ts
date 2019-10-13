import { Injectable } from '@angular/core';
import { MessageType } from 'app/service/toast-notification-service/message-type.enum';

declare var $: any;

@Injectable()
export class ToastService {

  static show(msg: string, type?: MessageType) {
    if (!type) {
      type = MessageType.INFO;
    }
    $.notify({ 'message': msg }, { 'type': type, 'timer': 3000, 'placement': { 'from': 'top', 'align': 'right' } });
  }

  static showAlert(msg: string) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      message: '',
    }, {
        timer: 3000,
        allow_dismiss: true,
        template:
          '<div class="alert alert-warning alert-with-icon" data-notify="container">' +
          '<i class="material-icons" data-notify="icon">notifications</i>' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="material-icons">close</i></button>' +
          '<span data-notify="message">' + msg + '</span>' +
          '</div>',
        placement: {
          from: 'bottom',
          align: 'right'
        }
      });
  }
}
