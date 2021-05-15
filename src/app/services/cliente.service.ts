import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection }
from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cliente } from '../models/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 private colecaoCliente: AngularFirestoreCollection<Cliente>;
  constructor(
  private afs: AngularFirestore
  ) {
    this.colecaoCliente = this.afs.collection<Cliente>('CadCliente');
   }

  listaCliente(){
   return this.colecaoCliente.snapshotChanges().pipe(
     map(actions =>{
       return actions.map(a=>{
         const data = a.payload.doc.data();
         const id = a.payload.doc.id;
         return {id,...data};
       });
     })
   );
  }
  addCliente(cliente:Cliente){
   return this.colecaoCliente.add(cliente);
  }
  mostraCliente(id:string){
    return this.colecaoCliente.doc<Cliente>(id).valueChanges();
  }
editarCliente(id:string, cliente:Cliente){
 return this.colecaoCliente.doc<Cliente>(id).update(cliente);

}
excluirCliente(id:string){
 return this.colecaoCliente.doc(id).delete();
}
}
