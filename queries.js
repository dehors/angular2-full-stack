var conexion = require('./connections');

function MetodosDB(){
	this.seleccionar = function(respuesta){
		conexion.obtener(function(err,cn){
			cn.query("select * from inventario",function(error,resultado){
				cn.release();
				if (error) {
					respuesta.send({estado:'error'});
				}else{
					respuesta.send(resultado);
				}
			});
		});
	}
	this.seleccionarId = function(id,respuesta){
		conexion.obtener(function(er,cn){
			cn.query('select * from inventario where id =?',id, function(error,resultado){
				cn.release();
				if (er) {
					respuesta.send({estado:'Error'});
				}else{
					respuesta.send(resultado);
				}
			})
		})
	}
	this.insertar = function(datos,respuesta){
		conexion.obtener(function(er,cn){
			cn.query('insert into inventario set ?',datos,function(error,resultado){
				cn.release();
				if (error) {
					respuesta.send({estado:'Error'});
				}else{
					respuesta.send({estado:'Ok'});
				}
			})
		})
	}
	this.actualizar = function(datos,respuesta){
		conexion.obtener(function(er,cn){
			cn.query('update inventario set ? where id = ?', [datos,datos.id], function(error,resultado){
				cn.release();
				if (error) {
					respuesta.send({estado:'Error'});
				}else{
					respuesta.send({estado:'Ok'});
				}
			});
		})
	}
	this.borrar = function(id,respuesta){
		conexion.obtener(function(er,cn){
			cn.query('delete from inventario where id = ?',id,function(error,resultado){
				cn.release();
				if (error) {
					respuesta.send({estado:'Error'});
				}else{
					respuesta.send({estado:'Ok'});
				}
			});
		})
	}
}

module.exports = new MetodosDB();
