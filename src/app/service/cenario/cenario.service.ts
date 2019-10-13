import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'app/constant/constant';
import { Cenario } from 'app/model/cenario.model';
import { DashContent } from 'app/model/dashContent.model';
import { Observable } from 'rxjs';
import { CrudService } from '../generic-crud/generic-crud.service';
import { ErrorService } from '../toast-notification-service/error-service/error.service';

@Injectable()
export class CenarioService extends CrudService<Cenario> {

  private cenarioUrl = this.baseURL;

  constructor(http: Http,
    public activatedRoute: ActivatedRoute,
    errorHandler?: ErrorService) {
    super(http, Constant.CENARIO, errorHandler, activatedRoute);
  }

  getDashContent(): Observable<DashContent> {
    return this.get(`${this.cenarioUrl}dashboard/`);
  }

}
