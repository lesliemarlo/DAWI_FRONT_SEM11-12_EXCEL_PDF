import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { RevistaService } from '../../services/revisa.service';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-revista',
  templateUrl: './consulta-revista.component.html',
  styleUrls: ['./consulta-revista.component.css']
})
export class ConsultaRevistaComponent {
      //Grila
      dataSource:any;

      //Clase para la paginacion
      @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

      //Cabecera
      displayedColumns = ["idRevista","nombre","frecuencia","fechaCreacion","telefono","pais","tipo", "estado"];

      //ArrayList para País y Tipo para los combobox
      lstPais: Pais[] = [];
      lstTipo: DataCatalogo[] = [];

      //Para los filtros - Inicializar los campos con valores por defecto
      varNombre: string = "";
      varFrecuencia: string = "";
      varEstado: boolean = true;
      varFechaCreacionDesde: Date = new Date();
      varFechaCreacionHasta: Date = new Date();
      varIdPais: number = -1;
      varIdTipo: number = -1;


      //Constructor
      constructor(private utilService:UtilService,
                  private revistaService:RevistaService
      ){

      }

      //Método que se ejecuta después de ejecutarse el Constructor
      ngOnInit() {
        this.utilService.listaTipoLibroRevista().subscribe(
          x =>  this.lstTipo = x
        );
        this.utilService.listaPais().subscribe(
          x =>  this.lstPais = x
        ); 
      }

      //Método para filtrar
      filtrar(){
        console.log(">>> Filtrar [inicio]");
        console.log(">>> varNombre: "+this.varNombre);
            console.log(">>> varFrecuencia: "+this.varFrecuencia);
            console.log(">>> varEstado: "+this.varEstado);
            console.log(">>> varFechaCreacionDesde: "+this.varFechaCreacionDesde.toISOString); 
            console.log(">>> varFechaCreacionHasta: "+this.varFechaCreacionHasta.toISOString);
            console.log(">>> varIdPais: "+this.varIdPais);
            console.log(">>> varIdTipo: "+this.varIdTipo);

            this.revistaService.consultarRevistaComplejo(
                        this.varNombre, 
                        this.varFrecuencia, 
                        this.varFechaCreacionDesde.toISOString(), 
                        this.varFechaCreacionHasta.toISOString(), 
                        this.varEstado ? 1 : 0, 
                        this.varIdPais, 
                        this.varIdTipo).subscribe(
                  x => {
                        this.dataSource = x;
                        this.dataSource.paginator = this.paginator;
                  }
            );
        console.log(">>> Filtrar [fin]");

        
      }
//PDF ----------------------------
      exportarPDF() {

        this.revistaService.generateDocumentReport( 
                              this.varNombre, 
                              this.varFrecuencia, 
                              this.varFechaCreacionDesde.toISOString(), 
                              this.varFechaCreacionHasta.toISOString(), 
                              this.varEstado ? 1 : 0, 
                              this.varIdPais, 
                              this.varIdTipo).subscribe(
              response => {
                console.log(response);
                var url = window.URL.createObjectURL(response.data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.setAttribute('target', 'blank');
                a.href = url;
                a.download = response.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            }); 
      }

      //EXCEL ----------------------------
      exportarExcel() {

        this.revistaService.generateDocumentExcel( 
                              this.varNombre, 
                              this.varFrecuencia, 
                              this.varFechaCreacionDesde.toISOString(), 
                              this.varFechaCreacionHasta.toISOString(), 
                              this.varEstado ? 1 : 0, 
                              this.varIdPais, 
                              this.varIdTipo).subscribe(
              response => {
                console.log(response);
                var url = window.URL.createObjectURL(response.data);
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.setAttribute('style', 'display: none');
                a.setAttribute('target', 'blank');
                a.href = url;
                a.download = response.filename;
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            }); 
      }

}