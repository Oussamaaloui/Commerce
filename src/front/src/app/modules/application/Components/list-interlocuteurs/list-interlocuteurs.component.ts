import { Component } from '@angular/core';
import {Entreprise} from "../../models/entreprise.model";
import {EntrepriseService} from "../../services/entreprises.service";
import {ConfirmDialogService} from "../../../../helpers/ui/confirm-dialog.service";
import {ToasterService} from "../../../../helpers/ui/toaster.service";
import {TypeEntreprise} from "../../models/enums/type-entreprise.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {InterlocuteurService} from "../../services/interlocuteur.service";
import {Interlocuteur} from "../../models/interlocuteur.model";

@Component({
  selector: 'app-list-interlocuteurs',
  templateUrl: './list-interlocuteurs.component.html',
  styleUrls: ['./list-interlocuteurs.component.css']
})
export class ListInterlocuteursComponent {
  interlocuteurs: Interlocuteur[] = [];
  entreprises: Entreprise[];
  modalMode: 'edit' | 'create' | 'view' = 'create';
  currentInterlocuteur: Interlocuteur;
  popupVisible: boolean = false;
  constructor(private service: InterlocuteurService,
              private entrepriseService: EntrepriseService,
              private confirmationService : ConfirmDialogService,
              private notificationService: ToasterService){

  }

  ngOnInit(): void {
    this.loadData();
    this.loadEntreprises();
  }

  loadEntreprises(){
    this.entrepriseService.getAll()
      .subscribe(
        (result) => {
          this.entreprises = result
        }
      );
  }

  loadData(){
    this.service.getAll()
      .subscribe({
        next: (data) =>{
          this.interlocuteurs = data;
        }
      })
  }

  initCurrentObj(): Interlocuteur{
    return {
      id: null,
      nom: '',
      email: '',
      entrepriseId: null,
      entreprise: '',
      numero: ''
    };
  }
  openModalInMode(mode: 'edit' | 'create' | 'view') {
    this.modalMode = mode;

    if (mode === 'create') {
      this.currentInterlocuteur = this.initCurrentObj();
    }

    this.popupVisible = true;
  }

  cancelCreateOrUpdate() {
    this.popupVisible = false;
  }

  createdOrUpdateEvent() {
    this.popupVisible = false;
    this.loadData();
  }

  editElement(id: number){
    this.service.getById(id)
      .pipe()
      .subscribe(interlocuteur => {
        this.currentInterlocuteur = interlocuteur;
        this.openModalInMode('edit');
      })
  }

  deleteElement(id: number){
    let interlocuteur = this.interlocuteurs.filter(u => u.id === id)[0]
    if(interlocuteur){
      this.confirmationService.askUser(`Etes vous sûre de vouloir supprimer '${interlocuteur.nom}'`)
        .then(response =>{
          if(response){
            this.service.delete(id)
              .subscribe({
                next: () =>{
                  this.loadData();
                },
                error: (error: HttpErrorResponse)=>{
                  this.notificationService.showError(error.error.message);
                }
              })
          }
        });
    }
  }
}
