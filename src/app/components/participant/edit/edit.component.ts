import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    CommonModule,
    NgxMaskPipe,
    NgxMaskDirective,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  objEdit: any
  loader: boolean = false

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private data: DataService,
  ){}
  
   ngOnInit() {
    this.objEdit = this.dialogRef.id
 }

  edit(){
    if(this.objEdit.name_full && this.objEdit.mail){
        this.data.updateParticipant(this.objEdit).subscribe((ret: any) =>{
            if(ret){
              this.dialogRef.close()
              alert("Alterado com sucesso.")
            }
        })
    }else{
      alert('Preencha todos os campos.')
    }
  }
}
