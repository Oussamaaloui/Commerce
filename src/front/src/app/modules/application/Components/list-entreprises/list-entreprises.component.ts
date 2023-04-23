import {Component, OnInit} from '@angular/core';
import {Entreprise} from "../../models/entreprise.model";
import {EntrepriseService} from "../../services/entreprises.service";

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.css']
})
export class ListEntreprisesComponent implements OnInit {
  entreprises: Entreprise[] = [];

  constructor(private service: EntrepriseService){

  }

  ngOnInit(): void {
      this.service.getAll()
        .subscribe({
          next: (data) =>{
            this.entreprises = data;
            console.log(data)
          }
        })
  }


}
