import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { NavController, LoadingController, ToastController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import{ ClienteService } from 'src/app/services/cliente.service'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
 
private clienteId:string = null;
//public cliente:Cliente = {} ;
cliente = {} as Cliente;
private carregarClientes:any;
private clienteSubscription: Subscription;

  constructor(
    private clienteService: ClienteService,
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.clienteId = this.activateRoute.snapshot.params['id'];
    
    if(this.clienteId)
    this.carregarCliente();

   }

  ngOnInit() {
  }
  
  carregarCliente(){
    this.clienteSubscription = this.clienteService.mostraCliente
    (this.clienteId).subscribe(data => {this.cliente = data});
  }

    async salvarCliente(){
      if(this.clienteId){
        try{
          await this.clienteService.editarCliente(this.clienteId,this.cliente);
          this.navCtrl.navigateRoot('/home');  
        }catch(error){
        this.presentToast('Erro ao salvar');
        }
      }else{
        this.cliente.dataCadastro = new Date().getTime();
        try{
          await this.clienteService.addCliente(this.cliente);

          this.navCtrl.navigateRoot('/home');
        }catch(error){
          this.presentToast('Erro ao salvar');
        }
      }
    }
async presentToast(mensagem:string){
  const toast = await this.toastCtrl.create({
    message: mensagem,duration:2000
  });
  toast.present();
}



}