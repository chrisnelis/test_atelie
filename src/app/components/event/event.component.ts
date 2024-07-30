import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import localePt from '@angular/common/locales/pt';
import {MatCardModule} from '@angular/material/card';
import { CommonModule, registerLocaleData } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { InsertComponent } from './insert/insert.component';
import { EditComponent } from './edit/edit.component';
import { GetComponent } from './get/get.component';
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localePt);

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgxMaskPipe,
    MatCardModule,
    NgxMaskDirective,
    CommonModule,
    MatDialogModule,
    ToastrModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

    dataEvent: any
    loader: boolean = false

  constructor(
    private data: DataService,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.getDataEvents()
  }

   getDataEvents(){
      this.loader = true
      this.data.getListEvent().subscribe((ret: any) =>{
          this.dataEvent = ret
          this.loader = false
      })
   }

  openInsertEvent(){
   const dialog =  this.dialog.open(InsertComponent)
     dialog.afterClosed().subscribe((res:any) =>{
        this.getDataEvents()   
     });
  }


  openDetailsEvent(id: any){
    this.dialog.open(GetComponent, {id: id})
   }


   openEditEvent(id: any){
    const dialog =  this.dialog.open(EditComponent, {id: id})
      dialog.afterClosed().subscribe((res:any) =>{
         this.getDataEvents()   
      });
   }

}
