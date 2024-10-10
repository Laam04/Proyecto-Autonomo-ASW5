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
    usuario_id = g.usuario_id  # Suponiendo que el ID del usuario se obtiene del token JWT
    monto = data.get('monto')
    fecha_inicio = data.get('fecha_inicio')
    fecha_fin = data.get('fecha_fin')
    interes = data.get('interes')

    # Verificar que todos los campos requeridos estén presentes
    if not all([usuario_id, monto, fecha_inicio, fecha_fin, interes]):
        return jsonify({'error': 'Faltan datos'}), 400

    # Verificar si el préstamo es aceptado basándose en el historial crediticio
    aceptado = Prestamo.verificar_aceptacion_prestamo(usuario_id, monto)

    if aceptado:
        # Llamar al método para crear el préstamo en la base de datos
        try:
            Prestamo.crear_prestamo(usuario_id, monto, fecha_inicio, fecha_fin, interes)
            mysql.connection.commit()  # Confirmar cambios en la base de datos
            return jsonify({'mensaje': 'Préstamo creado con éxito'}), 201
        except Exception as e:
            mysql.connection.rollback()  # Revertir en caso de error
            return jsonify({'error': str(e)}), 500  # Devolver error si falla la creación
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
