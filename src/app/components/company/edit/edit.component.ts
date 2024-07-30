import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { DataService } from '../../../services/data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
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
    if(this.objEdit.name_decider && this.objEdit.phone && this.objEdit.mail && this.objEdit.address){
      
      this.data.updateCompany(this.objEdit).subscribe((ret: any) =>{
        if(ret){
          this.dialogRef.close()
          alert("Alterado com sucesso")          
        }
      })
    }else{
      alert("Preencha todos os campos.")
    }
  }


}
