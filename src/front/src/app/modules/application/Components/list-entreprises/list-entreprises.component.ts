import {Component, OnInit} from '@angular/core';
import {Entreprise} from "../../models/entreprise.model";
import {EntrepriseService} from "../../services/entreprises.service";
import {TypeEntreprise} from "../../models/enums/type-entreprise.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmDialogService} from "../../../../helpers/ui/confirm-dialog.service";
import {ToasterService} from "../../../../helpers/ui/toaster.service";

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.css']
})
export class ListEntreprisesComponent implements OnInit {
  entreprises: Entreprise[] = [];
  modalMode: 'edit' | 'create' | 'view' = 'create';
  currentEntreprise: Entreprise;
  popupVisible: boolean = false;
  constructor(private service: EntrepriseService,
              private confirmationService : ConfirmDialogService,
              private notificationService: ToasterService){

  }

  ngOnInit(): void {
      this.loadData();
  }

  loadData(){
    this.service.getAll()
      .subscribe({
        next: (data) =>{
          this.entreprises = data;
          console.log(data)
        }
      })
  }

  initCurrentObj(): Entreprise{
    return {
      id: undefined,
      nom: '',
      addresse: '',
      ville: '',
      codePostal: '',
      type: TypeEntreprise.Nouveau,
      reference:''
    };
  }
  openModalInMode(mode: 'edit' | 'create' | 'view') {
    this.modalMode = mode;

    if (mode === 'create') {
      this.currentEntreprise = this.initCurrentObj();
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

  editEntreprise(id: number){
    this.service.getById(id)
      .pipe()
      .subscribe(entreprise => {
        this.currentEntreprise = entreprise;
        this.openModalInMode('edit');
      })
  }

  deleteEntreprise(id: number){
    let entreprise = this.entreprises.filter(u => u.id === id)[0]
    if(entreprise){
      this.confirmationService.askUser(`Etes vous sûre de vouloir supprimer '${entreprise.nom}'`)
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
