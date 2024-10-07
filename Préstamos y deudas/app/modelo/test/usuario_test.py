import unittest
import json
from app import create_app, mysql

class TestUsuarioRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        
        # Configuración de la base de datos
        self.setup_database()

    def tearDown(self):
        # Limpia la base de datos después de cada prueba
        self.cleanup_database()
        self.app_context.pop()

    def setup_database(self):
        cursor = mysql.connection.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS Usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100),
            email VARCHAR(100),
            telefono VARCHAR(15),
            password VARCHAR(255)
        )''')
        mysql.connection.commit()
        cursor.close()

    def cleanup_database(self):
        cursor = mysql.connection.cursor()
        cursor.execute('DROP TABLE IF EXISTS Usuarios')
        mysql.connection.commit()
        cursor.close()

    def test_crear_usuario(self):
        response = self.client.post('/crear_usuario', data=json.dumps({
            'nombre': 'Juan Perez',
            'email': 'juan.perez@example.com',
            'telefono': '123456789',
            'password': 'contraseña123'
        }), content_type='application/json')
        
        self.assertEqual(response.status_code, 201)
        self.assertIn('Usuario creado con éxito', response.get_data(as_text=True))

    def test_obtener_usuarios(self):
        self.client.post('/crear_usuario', data=json.dumps({
            'nombre': 'Juan Perez',
            'email': 'juan.perez@example.com',
            'telefono': '123456789',
            'password': 'contraseña123'
        }), content_type='application/json')

        response = self.client.get('/usuarios')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Juan Perez', response.get_data(as_text=True))

if __name__ == '__main__':
    unittest.main()
