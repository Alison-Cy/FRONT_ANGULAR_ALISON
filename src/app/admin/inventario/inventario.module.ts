import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CategoriaService } from './services/categoria.service';
import { HttpClientModule } from '@angular/common/http';
//import { TableModule } from 'primeng/table';
//import { DialogModule } from 'primeng/dialog';
//import { ButtonModule } from 'primeng/button';
//import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
//import {ToolbarModule} from 'primeng/toolbar'
import { PrimengModule } from '../../primeng/primeng.module';




@NgModule({
  declarations: [
    ProductoComponent,
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    //TableModule,
    //DialogModule,
    //ButtonModule,
    //InputTextModule,
    ReactiveFormsModule,
    //ToolbarModule,
    PrimengModule
  ]
})
export class InventarioModule { }
