import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  private authService=inject(AuthService)
  private router = inject(Router)
  

  loginForm=new FormGroup({
    mail:new FormControl("", [Validators.email, Validators.required]),
    password:new FormControl("", Validators.required),
    rememberMe: new FormControl(false) // Nuevo control para 'Remember me'
  })

  //Formulario de olvidar contrasenia
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  //abre el modal de olvidar contraseña
  forgotPasswordModal = false;

  ngOnInit() {
    if(this.cargarCredenciales()){
      this.funIngresar();
    } // Carga en caso tenga la marca remember
    
  }
  
  funIngresar() {
    const formValue = this.loginForm.value;
    this.authService.loginConNest(formValue).subscribe(
      (res) => {
        console.log(res);
        if (formValue.rememberMe) {
          localStorage.setItem('mail', formValue.mail!);
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('password', formValue.password!);
        } else {
          localStorage.removeItem('mail');
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('password');
        }
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cargarCredenciales() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
      const mail = localStorage.getItem('mail');
      const password = localStorage.getItem('password');
      this.loginForm.patchValue({ mail, rememberMe, password });
      return true;
    }else{
      return false;
    }
  }

  //abre el modal
  openForgotPasswordModal() {
    this.forgotPasswordModal = true;
  }

  //cierra el modal
  closeForgotPasswordModal() {
    this.forgotPasswordModal = false;
  }

  //envia un email al usuario que lo olvido
  sendForgotPasswordEmail() {
    const email = this.forgotPasswordForm.value.email;
    console.log(`Simulando envío de correo a: ${email}`);
    alert(`Email sent successfully to: ${email}`);
    this.closeForgotPasswordModal(); // Cierra el modal después de simular el envío
    /*this.authService.sendForgotPasswordEmail(email).subscribe(
      (res) => {
        console.log('Correo de recuperación enviado:', res);
        this.closeForgotPasswordModal();
      },
      (error) => {
        console.error('Error al enviar correo:', error);
      }
    );*/
  }
  
}