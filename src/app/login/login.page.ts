import { Component, OnInit } from '@angular/core';
import { Login} from '../models/login';
import { ToastController,
  LoadingController,
  NavController
  } from '@ionic/angular';
  import { AngularFireAuth } from '@angular/fire/auth'; 
  
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   
  login = {} as Login;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCrtl: NavController,
    private aftAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }
async cadLogin (login:Login){
     console.log(login);
     if(this.formValidation()){
     let loader = await this.loadingCtrl.create({
       message:"Por favor Espere.."
     });
     loader.present();

     try{
      await this.aftAuth.
      signInWithEmailAndPassword(login.email,login.senha).
      then(data => {
        console.log(data);
        this.navCrtl.navigateRoot("cliente");
      });
     }catch(e){
      this.showToast(e);
     }
     loader.dismiss();
     }
   }
   
  formValidation(){
    if(!this.login.email){
      this.showToast("Digite seu e-mail.");
      return false;
    }
    if(!this.login.senha){
      this.showToast("Digite a senha");
      return false;
    }
    return true;
   }
   showToast(mensagem:string){
     this.toastCtrl.
     create({
       message: mensagem,
       duration: 5000
     }).then(toasData => toasData.present());

 }


}

