import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InventarioService } from './inventario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventarioValidator } from './inventario.validators';


@Component({
	selector: 'inventario-detalle',
	templateUrl: './inventario-detalle.component.html',
	providers: [InventarioService]
})
export class InventarioDetalleComponent implements OnInit {

	titulo = "Agregar un nuevo registro";
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: InventarioService,
		private fb: FormBuilder
		) { this.crearControles(); }

	ngOnInit() {
		let id = this.route.snapshot.params['id'];
		if (!id) return;
		console.log(id);
	}

	crearControles(){
		this.form = this.fb.group({
			id: ['', Validators.required, InventarioValidator.valorUnico(this.service)],
			producto:['', Validators.compose([
					Validators.required,
					Validators.maxLength(10)
				])],
			existencia:['', Validators.required],
			precio:['', Validators.required],
			proveedor:['', Validators.required]
		})
	}

	cleanform(){
		this.form.reset();
		//Sin validadores
		/*this.form.patchValue({
			id: '',
			producto: '',
			existencia: '',
			precio: '',
			proveedor: ''
		});*/
	}

	guardarInventario(){
		this.service.addInventario(this.form.value)
					.subscribe(
						rt => console.log(rt),
						er => console.log(er),
						() => console.log('Terminado')
					);
	}

}
