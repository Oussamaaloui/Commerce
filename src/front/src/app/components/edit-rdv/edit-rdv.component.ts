import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { RendezVous } from 'src/app/models/rendez-vous.model';  
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-edit-rdv',
  templateUrl: './edit-rdv.component.html',
  styleUrls: ['./edit-rdv.component.css']
})
export class EditRdvComponent implements OnInit, OnChanges  {
 
  
  public rdvForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private rdvService: RendezVousService){
    //this.setUpForm();
  }

  ngOnChanges(changes: SimpleChanges) {
     this.setUpForm();
  }

  setUpForm(){
    if(this.mode == 'create'){
       this.setupFormForCreation();
    }else if(this.mode == 'edit'){
      this.setupFormForUpdate();
    }
  }

  setupFormForCreation(){
    const currentDate = new Date(Date.now()).toLocaleString().split(' ')[0];
    this.rdvForm = this.formBuilder.group({
      title: [''],
      description: [''],
      typeRdv: [''],
      motif: [''],
      startDate: [currentDate],
      startHours: [8],
      startMinutes: [0],
      endDate: [currentDate],
      endHours: [9],
      endMinutes: [0],
      entreprise: [''],
      typeEntreprise: [],
      addresse: [''],
      ville: [''],
      codePostal:[''],
      interlocuteur: [''],
      email: [''],
      numero: ['']
    })
  }

  setupFormForUpdate(){
    console.log(this.currentRdv)

    let formattedStartDate = '';
    let formattedStartHours = 0;
    let formattedStartMinutes = 0;
    let formattedEndDate = '';
    let formattedEndHours = 0;
    let formattedEndMinutes = 0;

    if(this.currentRdv && this.currentRdv.start){
      formattedStartDate = (this.format(new Date(this.currentRdv.start)))
      formattedStartHours = (new Date(this.currentRdv.start)).getHours();
      formattedStartMinutes = (new Date(this.currentRdv.start)).getMinutes();
    }

    if(this.currentRdv && this.currentRdv.end){
      formattedEndDate = (this.format(new Date(this.currentRdv.end)))
      formattedEndHours = (new Date(this.currentRdv.end)).getHours();
      formattedEndMinutes = (new Date(this.currentRdv.end)).getMinutes();
    }

    this.rdvForm = this.formBuilder.group({
      title: [this.currentRdv?.titre],
      description: [this.currentRdv?.description],
      typeRdv: [this.currentRdv?.typeRendezVous],
      motif: [this.currentRdv?.motif],
      startDate: [formattedStartDate],
      startHours: [formattedStartHours],
      startMinutes: [formattedStartMinutes],
      endDate: [formattedEndDate],
      endHours: [formattedEndHours],
      endMinutes: [formattedEndMinutes],
      entreprise: [this.currentRdv?.entreprise],
      typeEntreprise: [this.currentRdv?.typeEntreprise],
      addresse: [this.currentRdv?.addresse],
      ville: [this.currentRdv?.ville],
      codePostal:[this.currentRdv?.codePostal],
      interlocuteur: [this.currentRdv?.interlocuteur],
      email: [this.currentRdv?.email],
      numero: [this.currentRdv?.numero]
    })
  }

  ngOnInit(): void {   
    console.log(this.user) 

    this.setupHoursAndMinutes() 
  }
  @Input() user : any;

  @Input() currentRdv: RendezVous | undefined;

  @Input() mode : 'edit'|'create'|'view' = 'create';

  @Output() cancel : EventEmitter<any> = new EventEmitter();
  @Output() createdOrUpdated : EventEmitter<any> = new EventEmitter();

  close(){
    this.cancel.emit();
   // this.dialogRef.close();
  } 

     // convenience getter for easy access to form fields
     get f() { return this.rdvForm.controls; }

     submitted: boolean = false;
     loading: boolean = false;
  onSubmit(){
    this.submitted = true;
    this.loading = true;
        // stop here if form is invalid 

        let startDate = new Date(this.f['startDate'].value)
        startDate.setHours(this.f['startHours'].value)
        startDate.setMinutes(this.f['startMinutes'].value)

        let endDate = new Date(this.f['endDate'].value)
        endDate.setHours(this.f['endHours'].value)
        endDate.setMinutes(this.f['endMinutes'].value) 

        if(this.mode == 'create'){
          this.currentRdv = {
            id: '',
            titre: this.f['title'].value,
            description: this.f['description'].value,
            typeRendezVous: this.f['typeRdv'].value,
            motif: this.f['motif'].value,
            start: startDate,
            end:endDate,
            entreprise: this.f['entreprise'].value,
            typeEntreprise: this.f['typeEntreprise'].value,
            addresse: this.f['addresse'].value,
            ville: this.f['ville'].value,
            codePostal: this.f['codePostal'].value,
            interlocuteur: this.f['interlocuteur'].value,
            email: this.f['email'].value,
            numero: this.f['numero'].value
          }
        }else if(this.mode == 'edit' && this.currentRdv){
          this.currentRdv = {
            id: this.currentRdv.id,
            titre: this.f['title'].value,
            description: this.f['description'].value,
            typeRendezVous: this.f['typeRdv'].value,
            motif: this.f['motif'].value,
            start: startDate,
            end:endDate,
            entreprise: this.f['entreprise'].value,
            typeEntreprise: this.f['typeEntreprise'].value,
            addresse: this.f['addresse'].value,
            ville: this.f['ville'].value,
            codePostal: this.f['codePostal'].value,
            interlocuteur: this.f['interlocuteur'].value,
            email: this.f['email'].value,
            numero: this.f['numero'].value
          }
        }
        

        if(this.mode == 'create' && this.currentRdv){
          this.rdvService.create(this.currentRdv)
          .pipe(map(() => this.currentRdv = undefined))
          .subscribe(() => {
            this.createdOrUpdated.emit();
          })
        }else if(this.mode == 'edit' && this.currentRdv){
          this.rdvService.update(this.currentRdv)
          .pipe(map(() => this.currentRdv = undefined))
          .subscribe(() => {
            this.createdOrUpdated.emit();
          })
        }

        
  }

  hours: {id: number, value:string}[] = []
  minutes: {id: number, value:string}[] = [];

  setupHoursAndMinutes(){
    for(let i = 0; i < 24; i++){
      this.hours.push({id: i, value:this.padLeft(i, 2)})
    }

    for(let i = 0; i < 60; i++){
      this.minutes.push({id: i, value:this.padLeft(i, 2)})
    }
  }


  padLeft(number: number, length: number, character: string = '0'): string {
    let result = String(number);
    for (let i = result.length; i < length; ++i) {
      result = character + result;
    }
    return result;
  };

  format(inputDate: Date | undefined) {
    if(inputDate instanceof Date){
      let date, month, year;
  
      date = inputDate.getDate();
      month = inputDate.getMonth() + 1;
      year = inputDate.getFullYear();
    
        date = date
            .toString()
            .padStart(2, '0');
    
        month = month
            .toString()
            .padStart(2, '0');
    
      return `${date}/${month}/${year}`;
    }

    return new Date(Date.now()).toLocaleString().split(' ')[0];
  }
}
