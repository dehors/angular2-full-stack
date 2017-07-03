import { NgModule }				from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { HomeComponent }		from './home/home.component';
import { ClientesComponent }	from './clientes/clientes.component';
import { ContactosComponent }	from './contactos/contactos.component';

import { InventarioModule } from './inventario/inventario.module';


const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'clientes', component: ClientesComponent },
	{ path: 'contactos', component: ContactosComponent },
	{ path: 'inventario', loadChildren: () => InventarioModule }
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes),
		InventarioModule
	],
	exports:[
		RouterModule
	]
})
export class AppRoutingModule { }
