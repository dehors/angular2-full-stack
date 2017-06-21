import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Inventario } from './inventario';
import { Observable } from 'rxjs/observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class InventarioService {
	private headers = new Headers({ 'Content-Type':'application/json' });
	private url = 'http://localhost:8000/inventario';

	constructor(private http: Http) { }

	getInventarios():Observable<Inventario[]>{
		let url = `${this.url}`;
		return this.http.get(url)
					.map(r => r.json())
					.catch(this.handleError);
	}

	getInventario(id: number):Observable<Inventario[]>{
		let url = `${this.url}/${id}`;
		return this.http.get(url)
					.first()
					.map(r => r.json())
					.catch(this.handleError);
	}

	addInventario(inventario: Inventario){
		let url = `${this.url}`;
		let iJson = JSON.stringify(inventario);
		return this.http.post(url, iJson, {headers: this.headers})
					.map(r => r.json())
					.catch(this.handleError);
	}

	private handleError(error: Response | any){
		let errMsg: string;
		if (error instanceof Response) {
			let body = error.json() || '';
			let err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`; 
		}else{
			errMsg = error.message ? error.message : error.toString();
		}
		return Observable.throw(errMsg);
		
	}

}
