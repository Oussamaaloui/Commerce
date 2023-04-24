import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
import { DxValidationGroupComponent } from 'devextreme-angular';
import {Entreprise} from "../../models/entreprise.model";
import {RendezVous} from "../../models/rendez-vous.model";
import {RendezVousService} from "../../services/rendez-vous.service";
import {Interlocuteur} from "../../models/interlocuteur.model";
import {InterlocuteurService} from "../../services/interlocuteur.service";

@Component({
  selector: 'app-edit-rdv',
  templateUrl: './edit-rdv.component.html',
  styleUrls: ['./edit-rdv.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRdvComponent implements OnInit {
  @Input() user : any;
  @Input() currentRdv: RendezVous;
  @Input() mode : 'edit'|'create'|'view' = 'create';
  @Output() cancel : EventEmitter<any> = new EventEmitter();
  @Output() createdOrUpdated : EventEmitter<any> = new EventEmitter();
  @Input() entreprises: Entreprise[];

  @ViewChild('rdvGroup', {static: false}) rdvGroup: DxValidationGroupComponent;

  @Input() interlocuteurs : Interlocuteur[];
  rules: any;

  submitted: boolean = false;
  loading: boolean = false;
  buttonMessage: string = this.mode === 'create'? 'Ajouter' : 'Enregistrer';

  getSubmitButtonText(){
    if(this.mode==='create')
      return 'Ajouter';
    return 'Enregistrer';
  }

  constructor(private rdvService: RendezVousService,
              private interlocuteursService: InterlocuteurService){
  }

  onEntrepriseChanged(event: any){
    let entrepriseId = event.value;
    this.interlocuteurs = [];

    this.interlocuteursService.getByEntreprise(entrepriseId)
      .subscribe((data) => this.interlocuteurs = data);
  }

  ngOnInit(): void {
    console.log('editor init!')
  }

  close(){
    this.cancel.emit();
  }

  onSubmit(){
      this.submitted = true;
      this.loading = true;

      if(this.rdvGroup.instance.validate().isValid){
        if(this.mode == 'create' && this.currentRdv){
          this.rdvService.create(this.currentRdv)
          .pipe(map(() => {}))
          .subscribe(() => {
            this.loading = false;
            this.createdOrUpdated.emit();

          })
        }else if(this.mode == 'edit' && this.currentRdv){
          this.rdvService.update(this.currentRdv)
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
  typeRendezVous: any = new ArrayStore({
    data: [
      { value:'Physique', display: 'Physique'},
      { value:'Visio', display: 'Visio'},
    ],
    key: 'value'
  })
  typeEntreprise: any = new ArrayStore({
    data: [
      { value:'Ancien', display: 'Ancien'},
      { value:'Nouveau', display: 'Nouveau'},
    ],
    key: 'value'
  })

  motif: any = new ArrayStore({
    data: [
      { value:'Decouverte', display: 'Découverte'},
      { value:'Negotiation', display: 'Négociation'},
      { value:'Conclusion', display: 'Conclusion'},
      { value:'Courtoisie', display: 'Courtoisie'},
      { value:'VisiteChantier', display: 'Visite Chantier'},
      { value:'JPO', display: 'JPO'},
      { value:'AccompagnementClient', display: 'Accompagnement Client'},
      { value:'BureauEtudeArchitechte', display: "Bureau d'études / Architechte"},
    ],
    key: 'value'
  })

}
