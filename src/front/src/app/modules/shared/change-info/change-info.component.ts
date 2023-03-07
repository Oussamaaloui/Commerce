 import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'; 
import { DxValidationGroupComponent } from 'devextreme-angular';
import { Observable, Subject } from 'rxjs'; 
import { ToasterService } from 'src/app/helpers/ui/toaster.service';
import { ChangeInfoModel } from 'src/app/models/change-password.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent {
  @ViewChild('validationGroup', { static: false }) validationGroup: DxValidationGroupComponent;

  @Input('openTrigger') openTrigger: Observable<void>; // = new Observable<void>();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  currentRequest: ChangeInfoModel;
  confirmPassword: string;

  constructor( 
    private userService: UserService,
    private notificationService: ToasterService,
    private authService: AuthenticationService
  ) {
    this.resetCurrentModel();
  }


  ngOnInit(): void {
    this.openTrigger.subscribe({
      next: () => { 
        this.validationGroup.instance.reset();
        this.resetCurrentModel();
      },
    });
  }

  resetCurrentModel() {
    
    this.currentRequest = {
      firstName: this.authService.currentUserValue?.firstName?? '',
      lastName: this.authService.currentUserValue?.lastName?? ''
    };
    this.confirmPassword = '';
  }

  onSubmit() {
    this.loading = true;
    console.log(this.validationGroup.instance.validate())
    if (this.validationGroup.instance.validate().isValid) {
      this.userService.changeInfo(this.currentRequest).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Informations mises à jour avec succès!'
          );
          this.authService.updateUsernames(this.currentRequest.firstName, this.currentRequest.lastName);
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
