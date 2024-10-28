import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultasBackServiceService } from '../../servicio/consultas-back-service.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  miForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private consultaBackApi: ConsultasBackServiceService,
    private router: Router
  ) {
    this.miForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(7), Validators.maxLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(15)]],
      contra: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmarEmail: ['', [Validators.required, Validators.email]],
      tipoUsuario: ['', Validators.required],
      especialidad: [''],
      matricula: [''],
      credencial: [''],
      habilitado: ['deshabilitado']
    }, { validators: this.passwordsMatchValidator });
  }

  // Validador para confirmar que las contraseñas coinciden
  passwordsMatchValidator(form: FormGroup) {
    const contrasena = form.get('contra')?.value;
    const confirmarContrasena = form.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { passwordsMismatch: true };
  }

  // Validador para confirmar que los correos electrónicos coinciden
  emailsMatchValidator(form: FormGroup) {
    const email = form.get('email')?.value;
    const confirmarEmail = form.get('confirmarEmail')?.value;
    return email === confirmarEmail ? null : { emailsMismatch: true };
  }

  actualizarTipoUsuario(tipo: string) {
    this.miForm.get('tipoUsuario')?.setValue(tipo);

    if (tipo === 'medico') {
      this.miForm.get('especialidad')?.setValidators(Validators.required);
      this.miForm.get('matricula')?.setValidators(Validators.required);
      this.miForm.get('credencial')?.clearValidators();
    } else {
      this.miForm.get('especialidad')?.clearValidators();
      this.miForm.get('matricula')?.clearValidators();
      this.miForm.get('credencial')?.setValidators(Validators.required);
    }

    this.miForm.get('especialidad')?.updateValueAndValidity();
    this.miForm.get('matricula')?.updateValueAndValidity();
    this.miForm.get('credencial')?.updateValueAndValidity();
  }

  registraUsuario() {
    if (this.miForm.valid) {
      const usuario = this.miForm.value;
      if (usuario.tipoUsuario === 'medico') {
        this.consultaBackApi.registrarMedic(usuario).subscribe(() => {
          this.router.navigateByUrl('/');
        });
      } else {
        this.consultaBackApi.registrar(usuario).subscribe(() => {
          this.router.navigateByUrl('/');
        });
      }
    }
  }
}
