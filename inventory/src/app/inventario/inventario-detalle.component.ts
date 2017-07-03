import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InventarioService } from './inventario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventarioValidator } from './inventario.validators';
import { Inventario } from './inventario';

@Component({
	selector: 'inventario-detalle',
	templateUrl: './inventario-detalle.component.html'
})
export class InventarioDetalleComponent implements OnInit {

	titulo = "";
	form: FormGroup;
	inventario: Inventario[];
	//inventario = new Inventario(null,null,null,null,null);
	esEdition = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: InventarioService,
		private fb: FormBuilder
		) {  }

	ngOnInit() {
		let id = this.route.snapshot.params['id'];
		if (!id){
			this.titulo = "Agregar un nuevo registro";
			this.crearControlesNuevos();
			return;
		}

		this.titulo = "Editar registro";
		this.crearControlesEditar();
		this.service.getInventario(id)
			.subscribe(
					rs => this.inventario = rs,
					er => console.log('Error: %s', er),
					() => {
						if (this.inventario.length > 0) {
							this.esEdition = true;
							this.form.patchValue({
								id: this.inventario[0].id,
								producto: this.inventario[0].producto,
								existencia: this.inventario[0].existencia,
								precio: this.inventario[0].precio,
								proveedor: this.inventario[0].proveedor
							})
						}
					}
				)
		console.log(id);
	}

	crearControlesNuevos(){
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

	crearControlesEditar(){
		this.form = this.fb.group({
			id: [''],
			producto:['', Validators.compose([
					Validators.required,
					Validators.maxLength(10)
				])],
			existencia:['', Validators.required],
			precio:['', Validators.required],
			proveedor:['', Validators.required]
		})
	}

	cleanform(form){
		//with FormsModule
		//form.reset();

		//Sin validadores
		//this.invetario.id = 0;
		//this.invetario.producto = '';

		//with ReactiveFormsModule
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
		if (this.esEdition) {
			this.updateInventario(this.form.value);
		}else{
			this.agregarInventario(this.form.value);
		}
	}

	agregarInventario(inventario: Inventario){
		this.service.addInventario(inventario)
					.subscribe(
						rt => console.log(rt),
						er => console.log(er),
						() => console.log('Terminado')
					);
	}

	updateInventario(inventario: Inventario){
		if(!inventario) return;
		this.service.putInventario(inventario)
			.subscribe(
					rt => console.log(rt),
					er => console.log(er),
					() => this.goLista()
				)
	}

	goLista(){
		let link = ['/inventario/lista'];
		this.router.navigate(link);
	}

}
