import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { LayoutComponent } from './layout/layout.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CategoriaService } from './inventario/services/categoria.service';
import { HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InventarioModule } from './inventario/inventario.module';
import { ProductoService } from './inventario/services/producto.service';
import { peticionInterceptor } from '../interceptors/peticion.interceptor';


@NgModule({
  declarations: [
    PerfilComponent,
    ClienteComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    TableModule,
    InventarioModule
  ],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: peticionInterceptor,
      multi:true
    },*/
    CategoriaService,
    ProductoService
  ]
})
export class AdminModule { }
