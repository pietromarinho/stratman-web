import { Injectable } from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoaderService } from '../loader/loader-service';
import { Constant } from 'app/constant/constant';

@Injectable()
export class InterceptedHttp extends Http {
    lastRequest: any;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private loaderService: LoaderService) {
        super(backend, defaultOptions);
    }

    getSynchronizedRequest(request: Request, options?: RequestOptionsArgs): Observable<Response> {

        if (request.url.indexOf(Constant.BASE_URL) < 0) {
            return super.request(request, options);
        }

        const requestObservable: any = Observable.create(observer => {

            this.setRequestOptionArgs(request);
            const req: any = super.request(request, options);

            req.subscribe(
                success => {
                    requestObservable.isFinished = true; observer.next(success);
                },
                error => {
                    requestObservable.isFinished = true; observer.error(error);
                },
                () => { requestObservable.isFinished = true; observer.complete(); });

            this.lastRequest = requestObservable;
            this.lastRequest.isFinished = false;
        });

        if (this.lastRequest) {
            const myLastRequest = this.lastRequest;
            const waiterObservable = Observable.create(observer => {

                const recursiveCheck = () => {
                    if (myLastRequest.isFinished) {
                        requestObservable.subscribe(
                            success => { observer.next(success); waiterObservable.isFinished = true; },
                            error => { observer.error(error); waiterObservable.isFinished = true; },
                            () => { observer.complete(); waiterObservable.isFinished = true; });
                    } else {
                        setTimeout(recursiveCheck, 0);
                    }
                };

                recursiveCheck();
            });

            waiterObservable.isFinished = false;
            return this.lastRequest = waiterObservable;
        }

        return requestObservable;
    }

    request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.loaderService.enqueueRequest(this.getSynchronizedRequest(url, options))
            .map(o => this.handleResponse(url, o))
            .catch(err => this.handleError(url, err));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (localStorage.getItem('auth')) {
            options.headers.set('Authorization', `TEL=${localStorage.getItem('auth')}`);
        }

        return options;
    }

    private setRequestOptionArgs(request: Request) {
        if (!request) { return; }

        if (request.url.indexOf(Constant.BASE_URL) < 0) {
            return;
        }

        if (!request.headers) {
            request.headers = new Headers();
        }

        if (sessionStorage.getItem('auth')) {
            request.headers.set('Authorization', 'LEAN=' + sessionStorage.getItem('auth'));
        }

        if (sessionStorage.getItem('csrf')) {
            request.headers.set('csrf', sessionStorage.getItem('csrf'));
        }
    }

    public handleResponse(req: Request, response: Response): Response {

        if (req.url.indexOf(Constant.BASE_URL) < 0) {
            return response;
        }

        if (response.headers.has('csrf')) {
            sessionStorage.setItem('csrf', response.headers.get('csrf'));
        }

        return response;
    }

    public handleError(req: Request, error: Response | any) {

        if (req.url.indexOf(Constant.BASE_URL) < 0) {
            return Observable.throw(error);
        }

        if (error.headers.has('csrf')) {
            sessionStorage.setItem('csrf', error.headers.get('csrf'));
        }

        return Observable.throw(error);
    }
}
