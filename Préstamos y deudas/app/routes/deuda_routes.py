from flask import Blueprint, request, jsonify
from app.modelo.deuda import Deuda
from app import mysql

deuda_bp = Blueprint('deuda_bp', __name__)

@deuda_bp.route('/deudas', methods=['GET'])
def obtener_deudas():
    deudas = Deuda.obtener_deudas()
    return jsonify(deudas), 200

@deuda_bp.route('/deudas/<int:deuda_id>', methods=['GET'])
def obtener_deuda(deuda_id):
    deuda = Deuda.obtener_deuda_por_id(deuda_id)
    if deuda:
        return jsonify(deuda), 200
    else:
        return jsonify({'mensaje': 'Deuda no encontrada'}), 404

@deuda_bp.route('/deudas', methods=['POST'])
def crear_deuda():
    cursor = mysql.connection.cursor()
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    monto = data.get('monto')
    descripcion = data.get('descripcion')
    fecha_vencimiento = data.get('fecha_vencimiento')

    deuda_id = Deuda.crear_deuda(usuario_id, monto, descripcion, fecha_vencimiento)
    return jsonify({'deuda_id': deuda_id}), 201

@deuda_bp.route('/deudas/<int:deuda_id>', methods=['PUT'])
def actualizar_deuda(deuda_id):
    data = request.get_json()
    monto = data.get('monto')
    descripcion = data.get('descripcion')
    fecha_vencimiento = data.get('fecha_vencimiento')

    Deuda.actualizar_deuda(deuda_id, monto, descripcion, fecha_vencimiento)
    return jsonify({'mensaje': 'Deuda actualizada correctamente'}), 200

@deuda_bp.route('/deudas/<int:deuda_id>', methods=['DELETE'])
def eliminar_deuda(deuda_id):
    Deuda.eliminar_deuda(deuda_id)
    return jsonify({'mensaje': 'Deuda eliminada correctamente'}), 200
