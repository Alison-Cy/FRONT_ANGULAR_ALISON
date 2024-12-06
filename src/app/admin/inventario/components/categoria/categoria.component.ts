import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { error } from 'console';

interface Categoria {
  id: number,
  nombre: string;
  detalle: string
}
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)

  categorias: Categoria[]=[]
  dialog_visible: boolean=false;
  categoria_id:number=-1;
  categoriaForm= new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });


  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.categoriaService.funListar().subscribe(
      (res:any)=>{
        this.categorias=res;
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

  mostrarDialog(){
    this.dialog_visible=true
  }

  guardarCategoria()
  {
    if(this.categoria_id>0)
      {
        this.categoriaService.funModificar(this.categoria_id,this.categoriaForm.value).subscribe
        (
          (res:any)=>
            {
              this.dialog_visible=false;
              this.getCategorias();
              this.categoria_id=-1;
              this.alerta("ACTUALIZADO","La categoría se modifico con éxito!","success")
              
            },
            (error:any)=>
            {
              this.alerta("ERROR AL ACTUALIZAR","Verifica lo datos!","error")
            }
            
        );  
        this.categoriaForm.reset();
      }
    else
    {
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe
      (
        (res:any)=>
        {
          this.dialog_visible=false;
          this.getCategorias();
          this.alerta("REGISTRADO","La categoría se creó con éxito!","success")
          
        }
      ),
      (error:any)=>{
        this.alerta("ERROR AL REGISTRADO","Verifica lo datos!","error")
      }
    this.categoriaForm.reset();
    }
  }


  editarCategoria(cat:Categoria){
    this.dialog_visible=true
    this.categoria_id=cat.id
    this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle})
  }
  eliminarCategoria(cat:Categoria){
    Swal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res:any)=>{
            this.alerta("ELIMINADO!","Categoría eliminada.","success")
            
            this.getCategorias();
            this.categoria_id=-1
          },
          (error:any)=>{
            this.alerta("ERROR!","Error al intentar eliminar.","error")
            
          }
        )
        
      }
    });
  }

  alerta(title:string, text:string, icon:'success'|'error'|'info'|'question'){
    Swal.fire({title,text,icon});
     // title: title,
    //  text: text,
     // icon: icon
    
  }
}
