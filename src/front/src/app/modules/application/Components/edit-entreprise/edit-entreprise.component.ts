import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
import { DxValidationGroupComponent } from 'devextreme-angular';
import {Entreprise} from "../../models/entreprise.model";
import {EntrepriseService} from "../../services/entreprises.service";

@Component({
  selector: 'app-edit-entreprise',
  templateUrl: './edit-entreprise.component.html',
  styleUrls: ['./edit-entreprise.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEntrepriseComponent  {
  @Input() user : any;
  @Input() currentObj: Entreprise;
  @Input() mode : 'edit'|'create'|'view' = 'create';
  @Output() cancel : EventEmitter<any> = new EventEmitter();
  @Output() createdOrUpdated : EventEmitter<any> = new EventEmitter();

  @ViewChild('group', {static: false}) rdvGroup: DxValidationGroupComponent;

  rules: any;

  submitted: boolean = false;
  loading: boolean = false;
  buttonMessage: string = this.mode === 'create'? 'Ajouter' : 'Enregistrer';

  getSubmitButtonText(){
    if(this.mode==='create')
      return 'Ajouter';
    return 'Enregistrer';
  }

  constructor(private service: EntrepriseService){
  }

  close(){
    this.cancel.emit();
  }

  onSubmit(){
      this.submitted = true;
      this.loading = true;

      if(this.rdvGroup.instance.validate().isValid){
        if(this.mode == 'create' && this.currentObj){
          this.service.create(this.currentObj)
          .pipe(map(() => {}))
          .subscribe(() => {
            this.loading = false;
            this.createdOrUpdated.emit();

          })
        }else if(this.mode == 'edit' && this.currentObj){
          this.service.update(this.currentObj)
          .pipe(map(() => {}))
          .subscribe(() => {
            this.loading = false;
            this.createdOrUpdated.emit();
          })
        }
      }else{
        this.loading = false;
      }

  }

  // Select box data sources:
  typeEntreprise: any = new ArrayStore({
    data: [
      { value:'Ancien', display: 'Ancien'},
      { value:'Nouveau', display: 'Nouveau'},
    ],
    key: 'value'
  })
}
