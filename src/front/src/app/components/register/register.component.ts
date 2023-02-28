import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { RegisterModel } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 

    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$'),
            Validators.minLength(6),
            Validators.maxLength(25),
          ],
        ],
        confirmPassword: [''],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }
 

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() { 
    this.submitted = true; 
    if (this.registerForm.invalid) {
      return;
    }

    let user: RegisterModel = {
      email: this.f['email'].value,
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value,
    }; 

    this.userService.register(user)
      .pipe(
        map( () => this.router.navigateByUrl('login') )
      )
      .subscribe();
  }
}
