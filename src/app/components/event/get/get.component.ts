import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DataService } from '../../../services/data.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    AutocompleteLibModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './get.component.html',
  styleUrl: './get.component.scss'
})
export class GetComponent {
  objListPart: any
  id_event: any
  objGuestEvent: any
 loader: boolean = false

  constructor(
    public dialogRef: MatDialogRef<GetComponent>,
    private data: DataService,
  ){}

  ngOnInit() {
    this.loader = true
    this.id_event = this.dialogRef.id
    this.getParticipants()
     this.getParticipantsEvent()
   
  }


  getParticipants(){
    this.data.getListParticipant().subscribe((ret: any) =>{
        this.objListPart = ret
        
    })
  }


  getParticipantsEvent(){
    this.loader = true
      this.data.getParticipantEvent(this.id_event).subscribe((ret: any) =>{
          this.objGuestEvent = ret
          this.loader = false
      })
  }

  selectGuest(e: any){
    this.loader = true
    let obj = {
      id_event: this.id_event,
      id_participant: e.id
    }

    this.data.insertGuest(obj).subscribe((ret: any) =>{
       if(ret){
          this.getParticipantsEvent()
          alert(ret.text)
       }
    })
  }

}
