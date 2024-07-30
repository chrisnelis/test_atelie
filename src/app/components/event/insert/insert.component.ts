import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insert',
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

  ],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class InsertComponent {
    objCompany: any

    company: any
    title: any
    descr: any
    date_start: any
    date_end: any

  constructor(
    public dialogRef: MatDialogRef<InsertComponent>,
    private data: DataService,
  ){}

  ngOnInit() {
    this.getCompany()
  }

   getCompany(){
      this.data.getListCompany().subscribe((ret: any) =>{
          this.objCompany = ret
      })
   }

  close(){
    this.dialogRef.close();
  }


  save(){
    let obj ={
      company: this.company,
      descr: this.descr,
      date_end: this.date_end,
      date_start: this.date_start,
      title: this.title
    }

    if(this.company && this.descr && this.date_end && this.date_start && this.title){
        this.data.insertEvent(obj).subscribe((data: any) =>{
        if(data){
          alert("Campanha criada")
          this.close()
        }
      })
    }else{
      alert("Preencha todos os campos")
    }
  }


}
