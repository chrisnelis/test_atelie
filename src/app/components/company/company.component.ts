import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { InsertComponent } from './insert/insert.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  objCompany: any
  loader: boolean = false 
  constructor(
    private data: DataService,
    public dialog: MatDialog,

  ) {}


  ngOnInit() {
    this.getCompanys()   

  }

  getCompanys(){
    this.loader = true
      this.data.getListCompany().subscribe((ret: any) =>{
        this.objCompany = ret
        this.loader = false
        console.log(ret)
      })
  }

  
  insertCompany(){
    const dialog =  this.dialog.open(InsertComponent)
      dialog.afterClosed().subscribe((res:any) =>{
         this.getCompanys()   
      });
   }


   deleteCompany(obj: any){
      const dialog =  this.dialog.open(ConfirmDeleteComponent, {id: obj})
      dialog.afterClosed().subscribe(() =>{
         this.getCompanys()   
      });
   }
   
   
   editCompany(obj: any){
    const dialog =  this.dialog.open(EditComponent, {id: obj})
      dialog.afterClosed().subscribe(() =>{
         this.getCompanys()   
      });
   }
   
}
