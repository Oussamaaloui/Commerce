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
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
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
    private router: Router,
    private notificationService: ToasterService
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

    // this.userService.register(user)
    //   .pipe(
    //     map( () => this.router.navigateByUrl('login') )
    //   )
    //   .subscribe(
    //     completed =>{
    //         this.notificationService.showSuccess('Création de compte avec succès. Veuillez vous authentifier!')
    //     },
    //     error =>{
    //       this.notificationService.showError('Création de compte a échoué. Plus de détail dans la console!')
    //       console.log(error)
    //       console.log(error.error.errors)
    //     }
    //   );

      this.userService.register(user)
      .subscribe({
        next: (v) => {
          console.log(v)
          this.notificationService.showSuccess('Création de compte avec succès. Veuillez vous authentifier!')
          this.router.navigateByUrl('login')
        },
        error: (e) => {
          this.notificationService.showError('Création de compte a échoué. Plus de détail dans la console!')
          console.log(e.error.errors)
          console.log(e)
        }
    })
  }
}
