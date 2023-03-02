import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RendezVous } from 'src/app/models/rendez-vous.model';  

@Component({
  selector: 'app-edit-rdv',
  templateUrl: './edit-rdv.component.html',
  styleUrls: ['./edit-rdv.component.css']
})
export class EditRdvComponent implements OnInit {
  ngOnInit(): void {  

    console.log(this.user)

    if(this.mode == 'create'){
      this.modeRdv = 'Créer';
    }else if(this.mode == 'edit'){
      this.modeRdv = 'Modifier';
    }else if(this.mode == 'view'){
      this.modeRdv = '';
    }
  }
  @Input() user : any;

  @Input() currentRdv: RendezVous | undefined;

  @Input() mode : 'edit'|'create'|'view' = 'create';

  @Output() cancel : EventEmitter<any> = new EventEmitter();
  @Output() createdOrUpdated : EventEmitter<any> = new EventEmitter();

  close(){
    this.cancel.emit();
  }

  modeRdv: string = '';

  onSubmit(){
    this.createdOrUpdated.emit();
  }
}
