import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
import { DxValidationGroupComponent } from 'devextreme-angular';
import {Interlocuteur} from "../../models/interlocuteur.model";
import {InterlocuteurService} from "../../services/interlocuteur.service";
import {EntrepriseService} from "../../services/entreprises.service";
import DataSource from 'devextreme/data/data_source';
import {Entreprise} from "../../models/entreprise.model";

@Component({
  selector: 'app-edit-interlocuteur',
  templateUrl: './edit-interlocuteur.component.html',
  styleUrls: ['./edit-interlocuteur.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInterlocuteurComponent{
  @Input() user : any;
  @Input() currentObj: Interlocuteur;
  @Input() mode : 'edit'|'create'|'view' = 'create';
  @Input() entreprises: Entreprise[];
  @Output() cancel : EventEmitter<any> = new EventEmitter();
  @Output() createdOrUpdated : EventEmitter<any> = new EventEmitter();

  @ViewChild('group', {static: false}) group: DxValidationGroupComponent;

  rules: any;

  submitted: boolean = false;
  loading: boolean = false;
  buttonMessage: string = this.mode === 'create'? 'Ajouter' : 'Enregistrer';

  getSubmitButtonText(){
    if(this.mode==='create')
      return 'Ajouter';
    return 'Enregistrer';
  }

  constructor(private service: InterlocuteurService){
  }


  close(){
    this.cancel.emit();
  }

  onSubmit(){
      this.submitted = true;
      this.loading = true;

      if(this.group.instance.validate().isValid){
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
}
