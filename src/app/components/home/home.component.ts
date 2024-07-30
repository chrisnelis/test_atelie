import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ParticipantComponent } from '../participant/participant.component';
import { EventComponent } from '../event/event.component';
import { CompanyComponent } from '../company/company.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTabsModule, 
    MatToolbarModule, 
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    ParticipantComponent,
    EventComponent,
    CompanyComponent,    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  objCompany: any = []
  objEvent: any = []
  objParticipant: any = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataParticipant = new MatTableDataSource(this.objParticipant);


  constructor(
  ) {}


}
