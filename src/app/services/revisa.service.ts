import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Revista } from '../models/revista.model';


const baseUrlRevista = AppSettings.API_ENDPOINT+ '/revista';
const baseUrlCrudRevista = AppSettings.API_ENDPOINT+ '/crudRevista';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {

  constructor(private http:HttpClient) { }

  //PC1 - Registrar
  registrar(data:Revista):Observable<any>{
    return this.http.post(baseUrlRevista, data);
  }

  //PC2 - CRUD
  registrarCrud(data:Revista):Observable<any>{
    return this.http.post(baseUrlCrudRevista+"/registraRevista", data);
  }
  actualizarCrud(data:Revista):Observable<any>{
    return this.http.put(baseUrlCrudRevista+"/actualizaRevista", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudRevista+"/eliminaRevista/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudRevista+"/listaRevistaPorNombreLike/"+ filtro);
  }

}
