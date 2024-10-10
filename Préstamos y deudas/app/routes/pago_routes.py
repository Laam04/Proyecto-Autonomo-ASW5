from flask import Blueprint, request, jsonify
from app.modelo.pago import Pago
from app import mysql

pago_bp = Blueprint('pago_bd', __name__)

@pago_bp.route('/pagos', methods=['GET'])
def obtener_pagos():
    pagos = Pago.obtener_pagos()
    return jsonify(pagos), 200

@pago_bp.route('/pagos/<int:pago_id>', methods=['GET'])
def obtener_pago(pago_id):
    pago = Pago.obtener_pago_por_id(pago_id)
    if pago:
        return jsonify(pago), 200
    else:
        return jsonify({'mensaje': 'Pago no encontrado'}), 404

@pago_bp.route('/pagos', methods=['POST'])
def crear_pago():
    cursor = mysql.connection.cursor()
    data = request.get_json()
    prestamo_id = data.get('prestamo_id')
    fecha_pago = data.get('fecha_pago')
    monto_pago = data.get('monto_pago')
    comentario = data.get('comentario')

    pago_id = Pago.crear_pago(prestamo_id, fecha_pago, monto_pago, comentario)
    return jsonify({'pago_id': pago_id}), 201

@pago_bp.route('/pagos/<int:pago_id>', methods=['PUT'])
def actualizar_pago(pago_id):
    data = request.get_json()
    fecha_pago = data.get('fecha_pago')
    monto_pago = data.get('monto_pago')
    comentario = data.get('comentario')

    Pago.actualizar_pago(pago_id, fecha_pago, monto_pago, comentario)
    return jsonify({'mensaje': 'Pago actualizado correctamente'}), 200

@pago_bp.route('/pagos/<int:pago_id>', methods=['DELETE'])
def eliminar_pago(pago_id):
    Pago.eliminar_pago(pago_id)
    return jsonify({'mensaje': 'Pago eliminado correctamente'}), 200
