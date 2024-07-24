import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../Services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private router: Router
  ){
        this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],

    });
  }

  onSubmit(): void {
    debugger
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.restService.Register(email, password)
        .then(response => {
          if (response) {
            this.router.navigate(['/login']);
          }
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    }
  }


}
