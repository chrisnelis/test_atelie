import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InsertComponent } from './insert/insert.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.scss'
})
export class ParticipantComponent {

  objListPart: any
  loader: boolean = false 

  constructor(
    private data: DataService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
      this.getParticipants()
  }


  
  getParticipants(){
    this.loader = true
    this.data.getListParticipant().subscribe((ret: any) =>{
        this.objListPart = ret
        this.loader = false
    })
  }



  insertParticipant(){
    const dialog =  this.dialog.open(InsertComponent)
      dialog.afterClosed().subscribe(() =>{
         this.getParticipants()   
      });
   }
  

   deleteParticipant(obj: any){
    const dialog =  this.dialog.open(ConfirmDeleteComponent, {id: obj})
      dialog.afterClosed().subscribe(() =>{
         this.getParticipants()   
      });
   }


   
   editParticipant(obj: any){
    const dialog =  this.dialog.open(EditComponent, {id: obj})
      dialog.afterClosed().subscribe(() =>{
         this.getParticipants()   
      });
   }
}
