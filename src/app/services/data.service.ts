import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService{

  constructor(
    private http: HttpClient
  ) { super()}


//#### rotas para campanhas/eventos
  getListEvent(){
    return this.http.get(this.apiUrl+'event/get/list/event')
  }

 getEvent(id: number){
    return this.http.get(this.apiUrl+'event/get/event/'+id)
  }

  insertEvent(obj: any){
    return this.http.post(this.apiUrl+'event/insert/event', obj)    
  }

  getParticipantEvent(id: number){
    return this.http.get(this.apiUrl+'event/get/guest/'+id)
  }

  insertGuest(obj: any){
    return this.http.post(this.apiUrl+'event/insert/guest', obj)   
  }

  updateEvent(obj: any){
    return this.http.post(this.apiUrl+'event/update/event', obj)   
  }
  
  deleteEvent(id: number){
    return this.http.delete(this.apiUrl+'event/delete/event/'+id)   
  }


  ///#######################
//#### rotas para empresas
getListCompany(){
  return this.http.get(this.apiUrl+'client/get/list/client')
}

getCompany(id: number){
  return this.http.get(this.apiUrl+'client/get/client/'+id)
}

insertCompany(obj: any){
  return this.http.post(this.apiUrl+'client/insert/client', obj)   
}

deleteCompany(id: number){
  return this.http.delete(this.apiUrl+'client/delete/company/'+id)   
}


updateCompany(obj: any){
  return this.http.post(this.apiUrl+'client/update/company', obj)   
}



  ///#######################
//#### rotas para participantes 
getListParticipant(){
  return this.http.get(this.apiUrl+'participants/get/list/participants')
}

getParticipant(id: number){
  return this.http.get(this.apiUrl+'participants/get/participants/'+id)
}

insertParticipant(obj: any){
  return this.http.post(this.apiUrl+'participants/insert/participant', obj)   
}

deleteParticipant(id: any){
  return this.http.delete(this.apiUrl+'participants/delete/participant/'+id)   
}

updateParticipant(obj: any){
  return this.http.post(this.apiUrl+'participants/update/participant', obj)   
}


}
