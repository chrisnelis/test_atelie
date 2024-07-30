import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {
  objDelete: any
  loader: any = false

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private data: DataService,
  ){

  }

  ngOnInit(){
    this.objDelete = this.dialogRef.id
  }

   remove(){
    this.loader = true
      this.data.deleteCompany(this.objDelete.id).subscribe((ret: any) =>{
        if(ret){
          this.loader = false
           this.dialogRef.close();
          alert(ret.msg)        
        }
      })
   }
}
