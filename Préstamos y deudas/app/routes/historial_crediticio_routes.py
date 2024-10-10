from flask import Blueprint, request, jsonify
from app.modelo.historial_crediticio import HistorialCrediticio
from app import mysql

historial_bp = Blueprint('historial_bp', __name__)

@historial_bp.route('/historiales', methods=['GET'])
def obtener_historiales():
    historiales = HistorialCrediticio.obtener_historiales()
    return jsonify(historiales), 200

@historial_bp.route('/historiales/<int:historial_id>', methods=['GET'])
def obtener_historial(historial_id):
    historial = HistorialCrediticio.obtener_historial_por_id(historial_id)
    if historial:
        return jsonify(historial), 200
    else:
        return jsonify({'mensaje': 'Historial no encontrado'}), 404

@historial_bp.route('/historiales', methods=['POST'])
def crear_historial():
    cursor = mysql.connection.cursor()
    data = request.get_json()
    usuario_id = data.get('usuario_id')
    score = data.get('score')
    fecha = data.get('fecha')

    historial_id = HistorialCrediticio.crear_historial_crediticio(usuario_id, score, fecha)
    return jsonify({'historial_id': historial_id}), 201

@historial_bp.route('/historiales/<int:historial_id>', methods=['PUT'])
def actualizar_historial(historial_id):
    data = request.get_json()
    score = data.get('score')
    fecha = data.get('fecha')

    HistorialCrediticio.actualizar_historial(historial_id, score, fecha)
    return jsonify({'mensaje': 'Historial actualizado correctamente'}), 200

@historial_bp.route('/historiales/<int:historial_id>', methods=['DELETE'])
def eliminar_historial(historial_id):
    HistorialCrediticio.eliminar_historial(historial_id)
    return jsonify({'mensaje': 'Historial eliminado correctamente'}), 200
