from flask import Blueprint, request, jsonify,g
from app.modelo.prestamo import Prestamo
from app import token_required 
from app import mysql 
prestamo_bp = Blueprint('prestamo_bd', __name__)

@prestamo_bp.route('/prestamos', methods=['GET'])
def obtener_prestamos():
    prestamos = Prestamo.obtener_prestamos()
    return jsonify(prestamos), 200

@prestamo_bp.route('/prestamos/<int:prestamo_id>', methods=['GET'])
def obtener_prestamo(prestamo_id):
    prestamo = Prestamo.obtener_prestamo_por_id(prestamo_id)
    if prestamo:
        return jsonify(prestamo), 200
    else:
        return jsonify({'mensaje': 'Préstamo no encontrado'}), 404
@prestamo_bp.route('/prestamos', methods=['POST'])
@token_required  
def crear_prestamo():
    cursor = mysql.connection.cursor()
    data = request.get_json()
    usuario_id = g.usuario_id  
    monto = data.get('monto')
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    interes = data.get('interes')

 
    if not all([usuario_id, monto, fecha_inicio, fecha_fin, interes]):
        return jsonify({'error': 'Faltan datos'}), 400

   
    aceptado = Prestamo.verificar_aceptacion_prestamo(usuario_id, monto)

    if aceptado:
      
        try:
            Prestamo.crear_prestamo(usuario_id, monto, fecha_inicio, fecha_fin, interes)
            mysql.connection.commit()  
            return jsonify({'mensaje': 'Préstamo creado con éxito'}), 201
        except Exception as e:
            mysql.connection.rollback()  
            return jsonify({'error': str(e)}), 500  
    else:
        return jsonify({'mensaje': 'Préstamo rechazado por historial crediticio'}), 400
@prestamo_bp.route('/prestamos/<int:prestamo_id>', methods=['PUT'])
def actualizar_prestamo(prestamo_id):
    data = request.get_json()
    monto = data.get('monto')
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    interes = data.get('interes')

    Prestamo.actualizar_prestamo(prestamo_id, monto, fecha_inicio, fecha_fin, interes)
    return jsonify({'mensaje': 'Préstamo actualizado correctamente'}), 200

@prestamo_bp.route('/prestamos/<int:prestamo_id>', methods=['DELETE'])
def eliminar_prestamo(prestamo_id):
    Prestamo.eliminar_prestamo(prestamo_id)
    return jsonify({'mensaje': 'Préstamo eliminado correctamente'}), 200
