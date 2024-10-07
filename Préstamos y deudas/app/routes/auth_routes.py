from flask import Blueprint, request, jsonify
from app.modelo.usuario import Usuario
import jwt
import datetime
from app.config import Config
from app import token_required  
from app import mysql

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    cursor = mysql.connection.cursor()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

 
    user = Usuario.obtener_usuario_por_email(email)

    if user and user['password'] == password:  
        # Generar el token JWT
        token = jwt.encode({
            'id': user['id'],
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
        }, Config.SECRET_KEY, algorithm="HS256")

        return jsonify({'token': token}), 200
    
    return jsonify({'message': 'Credenciales inválidas'}), 401
