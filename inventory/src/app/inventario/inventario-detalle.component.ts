import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
	selector: 'inventario-detalle',
	templateUrl: './inventario-detalle.component.html'
})
export class InventarioDetalleComponent implements OnInit {

	titulo = "Agregar un nuevo registro";

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		let id = this.route.snapshot.params['id'];
		if (!id) return;
		console.log(id);
	}

}
