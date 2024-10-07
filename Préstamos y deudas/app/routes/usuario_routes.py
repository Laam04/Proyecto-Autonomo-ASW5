from flask import Blueprint, request, jsonify
from app.modelo.usuario import Usuario
from app import mysql

usuario_bp = Blueprint('usuario_bp', __name__)
@usuario_bp.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        usuarios = Usuario.obtener_usuarios()  
        return jsonify(usuarios), 200
    except Exception as e:
        return jsonify({"message": f"Error al obtener usuarios: {str(e)}"}), 500
    
@usuario_bp.route('/usuarios', methods=['POST'])
def crear_usuario():
    try:
        
        datos = request.json
        nombre = datos.get('nombre')
        email = datos.get('email')
        telefono= datos.get('telefono')
        password = datos.get('password')

        if not all([nombre, email, password]):
            return jsonify({"message": "Faltan campos obligatorios"}), 400

       
        cursor = mysql.connection.cursor()

        
        query = "INSERT INTO usuarios (nombre, email, telefono, password) VALUES (%s, %s, %s,%s)"
        cursor.execute(query, (nombre, email, telefono, password))

        
        mysql.connection.commit()

        
        cursor.close()

        return jsonify({"message": "Usuario creado con éxito"}), 201

    except Exception as e:
        return jsonify({"message": f"Error al crear usuario: {str(e)}"}), 500

@usuario_bp.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    telefono = data.get('telefono')
    password = data.get('password')

    Usuario.actualizar_usuario(usuario_id, nombre, email, telefono, password)
    return jsonify({'mensaje': 'Usuario actualizado correctamente'}), 200

@usuario_bp.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def eliminar_usuario(usuario_id):
    Usuario.eliminar_usuario(usuario_id)
    return jsonify({'mensaje': 'Usuario eliminado correctamente'}), 200
