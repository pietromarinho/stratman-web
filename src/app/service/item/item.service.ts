import { Injectable } from '@angular/core';
import { CrudService } from '../generic-crud/generic-crud.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../toast-notification-service/error-service/error.service';
import { Constant } from 'app/constant/constant';
import { Item } from 'app/model/item.model';


@Injectable()
export class ItemService extends CrudService<Item> {

  constructor(http: Http,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.ITEM, errorHandler, activatedRoute);
  }

}
