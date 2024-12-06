import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password'
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

const PrimeNgModules=[
  ButtonModule,
  PasswordModule,
  TableModule,
  DialogModule,
  InputTextModule,
  ToolbarModule,
  DropdownModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ...PrimeNgModules
  ],
  exports:[
    ...PrimeNgModules
  ]
})
export class PrimengModule { }
