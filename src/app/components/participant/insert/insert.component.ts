import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';

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
    NgxMaskPipe,
    NgxMaskDirective,
    CommonModule
  ],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class InsertComponent {
  cpf: any
  name: any
  email: any
  loader: boolean = false

  constructor(
    private data: DataService,
  ){}

  validateCpf() {
    var cpf = this.cpf //resgatando o cpf digitado
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (!cpf ||cpf.length != 11 ||cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" ||cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" ||
      cpf == "66666666666" || cpf == "77777777777" ||cpf == "88888888888" || cpf == "99999999999") {
      alert("CPF inválido")
      this.cpf = undefined
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) {
      alert("CPF inválido")
      this.cpf = undefined
    }
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) {
      alert("CPF inválido")
      this.cpf = undefined
    }
    return true

  }


  save(){
    if(this.cpf && this.email && this.name){
      this.loader = true
        let obj ={
          cpf: this.cpf,
          mail: this.email,
          name_full:this.name
        }
      this.data.insertParticipant(obj).subscribe((ret: any) =>{
        if(ret){
          alert(ret.text)   
              this.loader = false
              this.cpf = undefined
              this.email  = undefined
              this.name = undefined
        }
      })

    }else{
      alert("Preencha todos os campos")
    }


  }
}
