from flask import Flask
from flask_mysqldb import MySQL
from flasgger import Swagger
from app.config import Config
import jwt
from flask import request, jsonify, g
from functools import wraps
from flask_cors import CORS

from flask_mysqldb import MySQL
mysql = MySQL()


def create_app():
    app = Flask(__name__)
    CORS(app) 

    app.config.from_object(Config)

    mysql.init_app(app)  

    
    from app.routes.usuario_routes import usuario_bp
    from app.routes.prestamos_routes import prestamo_bp
    from app.routes.deuda_routes import deuda_bp
    from app.routes.historial_crediticio_routes import historial_bp
    from app.routes.pago_routes import pago_bp
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(usuario_bp)
    app.register_blueprint(prestamo_bp)
    app.register_blueprint(deuda_bp)
    app.register_blueprint(historial_bp)
    app.register_blueprint(pago_bp)
    app.register_blueprint(auth_bp) 

    return app

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({'message': 'Token es requerido!'}), 401

        try:
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            g.usuario_id = data['id']  
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

        return f(*args, **kwargs)
    
    return decorated
