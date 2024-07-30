import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ 
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private data: DataService,
  ){}

  objEdit: any

  ngOnInit() {
     this.objEdit = this.dialogRef.id
  }



  close(){
    this.dialogRef.close();
  }

  edit(){
    let obj = {
      title: this.objEdit.title,
      description: this.objEdit.description,
      date_end: this.objEdit.date_end,
      date_start: this.objEdit.date_end,
      id: this.objEdit.id
    }
    this.data.updateEvent(obj).subscribe((ret: any) =>{
      if(ret){
        this.close()
        alert("Atualizado com sucesso!")
      }
    })
  }

  deleteEvent(){
    this.data.deleteEvent(this.objEdit.id).subscribe((ret: any) =>{
      if(ret){
        this.close()
        alert(ret.msg)
      }
    })
  }


}
