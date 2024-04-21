import { Component, Inject, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { Revista } from '../../models/revista.model';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../models/usuario.model';
import { RevistaService } from '../../services/revisa.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-revista-update',
  templateUrl: './crud-revista-update.component.html',
  styleUrls: ['./crud-revista-update.component.css'],
})
export class CrudRevistaUpdateComponent {
  lstPais: Pais[] = [];
  lstTipo: DataCatalogo[] = [];

  objRevista: Revista = {
    nombre: '',
    frecuencia: '',
    fechaCreacion: new Date(),
    telefono: '',
    pais: {
      idPais: -1,
    },
    tipoRevista: {
      idDataCatalogo: -1,
    },
  };
  objUsuario: Usuario = {};

  constructor(private utilService: UtilService, 
              private tokenService: TokenService,
              private revistaService: RevistaService,
              @Inject(MAT_DIALOG_DATA) public data: any){
            
            this.objRevista = data;    
            
            this.utilService.listaTipoLibroRevista().subscribe(
                  x =>  this.lstTipo = x
            );
            this.utilService.listaPais().subscribe(
              x =>  this.lstPais = x
            );
        this.objUsuario.idUsuario = tokenService.getUserId();
  }

  actualizar() {
    this.objRevista.usuarioActualiza = this.objUsuario;
    this.objRevista.usuarioRegistro = this.objUsuario;
    this.revistaService.actualizarCrud(this.objRevista).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
    });
  }
}
