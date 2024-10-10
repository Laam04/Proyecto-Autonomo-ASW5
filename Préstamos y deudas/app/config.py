import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'tu_llave_secreta'
    MYSQL_HOST = 'localhost'
    MYSQL_PORT = 3306
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'prestamosydeudas'
    MYSQL_CURSORCLASS = 'DictCursor'


class TestingConfig:
    TESTING = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'prestamosydeudas_test'  # Base de datos de prueba
    MYSQL_CURSORCLASS = 'DictCursor'