import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Observable } from 'rxjs';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  @ViewChild('validationGroup', { static: false }) validationGroup: DxValidationGroupComponent;
  loading: boolean = false;
  email: string = '';
  @Input('openTrigger') openTrigger: Observable<void>;
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService,
    private notificationService: ToasterService,
    private router: Router){ 
  }

  ngOnInit(): void {
    this.openTrigger.subscribe({
      next: () => {
        console.log('Displayed');
        this.validationGroup.instance.reset();
      },
    });
  }

  onSubmit() {
    this.loading = true;
    console.log(event)

    if (this.validationGroup.instance.validate().isValid) {
      this.userService.changeEmail({email: this.email}).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Mot de passe changé avec succès!'
          );
          this.loading = false;
          this.router.navigateByUrl('/logout')
          this.cancel.emit();
        },
        error: (e) => {
          this.loading = false;
          if (e instanceof HttpErrorResponse) {
            e.error.errors.forEach((element: string) => {
              this.notificationService.showError(element);
            });
          } else {
            this.notificationService.showError(
              'Erreur inconnue. Plus de détail dans la console.'
            );
            console.error(e.error);
          }
        },
      });
    } else {
      this.loading = false;
    }
  }

  close() {
    this.cancel.emit();
  }
}
