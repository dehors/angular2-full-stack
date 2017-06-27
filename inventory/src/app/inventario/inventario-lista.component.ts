import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario';
import { Router } from '@angular/router';


@Component({
    selector: 'inventario-lista',
    templateUrl: './inventario-lista.component.html'
})
export class InventarioListaComponent implements OnInit {
    lista: Inventario[];

    constructor(
        private servicio: InventarioService,
        private router: Router
        ) { }

    ngOnInit() {
        this.servicio.getInventarios()
        .subscribe(
            rs => this.lista = rs,
            er => console.log(er),
            () => console.log(this.lista)
            )
    }

    select(item: Inventario){
        let link = ['/inventario/detalle',item.id];
        this.router.navigate(link);
    }

}
