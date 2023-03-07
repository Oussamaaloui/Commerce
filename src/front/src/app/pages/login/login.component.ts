import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { LoginModel } from 'src/app/models/login.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = '';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService: ToasterService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }

        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
    }

    ngOnInit() { 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) { 
            return;
        }

        this.loading = true;

        this.authenticationService.login(this.f['username'].value, this.f['password'].value)
            .subscribe({
                next: (d) => {
                    this.notificationService.showSuccess('Connexion effectuée avec succès!')
                    this.router.navigate([this.returnUrl]);
                },
                error: (e) =>{
                    this.loading = false;

                    if(e instanceof HttpErrorResponse){
                        if(e.status == 403){
                            this.notificationService.showError(e.error)
                            console.log(e)
                        }else{
                            this.notificationService.showError('Connexion échouée. Email ou mot de passe erroné')
                        } 
                    }else{
                        this.notificationService.showError('Erreur inconnue. Plus de détail dans la console.')
                        console.error(e.error)
                    } 
                }
            }) 
    }
}
