import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { DataService } from '../../../services/data.service';

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
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule
  ],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class InsertComponent {
  social: any
  cnpj: any
  email: any
  address: any
  phone: any
  responsible: any

  loader: boolean = false

  constructor(
    public dialogRef: MatDialogRef<InsertComponent>,
    private data: DataService,
  ){}


  validatecnpj(){
     var cnpj = this.cnpj

    if(cnpj.length >= 14){ 
      function cnpjTests() {
        if (!cnpj) return false
        // Aceito receber o valor como string
        const tostri = typeof cnpj === 'string'
        const validate = tostri || Number.isInteger(cnpj) || Array.isArray(cnpj)
        // Elimino o valor em formato inválido
        if (!validate) return false
        // Filtro para string
        if (tostri) {
          //máximo de 18 caracteres, para CNPJ com pontos
          if (cnpj.length > 18) return false
          // Teste para veificar se é uma string
          const digitsOnly = /^\d{14}$/.test(cnpj)
          //Teste para formato válido
          const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj)
          if (digitsOnly || validFormat) true
          // Se o formato não for valido retorno falso.
          else return false
        }
        //Armazeno um array com todos os dígitos
        const fm = cnpj.toString().match(/\d/g)
        const fmnumb = Array.isArray(fm) ? fm.map(Number) : []
        // Valida a quantidade de dígitos
        if (fmnumb.length !== 14) return false
        // Elimino se todos os digitos forem iguais
        const items = [...new Set(fmnumb)]
        if (items.length === 1) return false
        // Cálculo do cnpj
        const calc = (x: any) => {
          const slice = fmnumb.slice(0, x)
          let factor = x - 7
          let sum = 0
          for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
          }
          const result = 11 - (sum % 11)
          return result > 9 ? 0 : result
        }
        //## isolando os 2 últimos dígitos de verificadores
        const digits = fmnumb.slice(12)        
        //Valido o primeiro e segundo dígito
        const digit0 = calc(12)
        if (digit0 !== digits[0]) return false
        const digit1 = calc(13)
        return digit1 === digits[1]
      }
      if (cnpjTests() == false) {
        //se o teste for falso, retorno mensagem de erro
        this.cnpj = undefined
         alert("CNPJ inválido")
      }
    }

  }

  save(){
      if( this.social && this.cnpj && this.email && this.address && this.phone &&this.responsible){
           let obj = {
              social: this.social,
              cnpj: this.cnpj,
              email: this.email,
              address: this.address,
              phone: this.phone,
              responsible: this.responsible
           }
        this.data.insertCompany(obj).subscribe((ret: any) =>{
           if(ret){
                alert(ret.text)    
                 this.social = undefined
                 this.cnpj = undefined
                 this.email = undefined
                 this.address = undefined
                 this.phone = undefined
                 this.responsible = undefined       
           }
        })
      }else{
        alert("Preencha todos os campos.")
      }
  }
}
