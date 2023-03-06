import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Observable, Subject } from 'rxjs';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { ChangePasswordModel } from 'src/app/models/change-password.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('changePasswordValidation', { static: false })
  changePasswordValidation: DxValidationGroupComponent;

  @Input('openTrigger') openTrigger: Observable<void>; // = new Observable<void>();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  public loginForm: FormGroup;
  loading: boolean = false;
  currentRequest: ChangePasswordModel;
  confirmPassword: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: ToasterService
  ) {
    this.resetCurrentModel();
  }

  ngOnInit(): void {
    this.openTrigger.subscribe({
      next: () => {
        console.log('Displayed');
        this.changePasswordValidation.instance.reset();
      },
    });
  }

  resetCurrentModel() {
    this.currentRequest = {
      oldPassword: '',
      newPassword: '',
    };
    this.confirmPassword = '';
  }

  onSubmit() {
    this.loading = true;

    if (this.changePasswordValidation.instance.validate().isValid) {
      this.userService.changePassword(this.currentRequest).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Mot de passe changé avec succès!'
          );
          this.loading = false;
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
