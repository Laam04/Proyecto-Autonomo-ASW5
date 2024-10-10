from mysql.connector import Error
from app import mysql

class Usuario:
    @staticmethod
    def crear_usuario(nombre, email, telefono, password):
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('''INSERT INTO Usuarios(nombre, email, telefono, password)
                              VALUES(%s, %s, %s, %s)''', (nombre, email, telefono, password))
            mysql.connection.commit()
            usuario_id = cursor.lastrowid
            return usuario_id
        except Error as e:
            print(f"Error al crear usuario: {e}")
            return None
        finally:
            cursor.close()

    
    @staticmethod
    def obtener_usuarios():
        cursor = mysql.connection.cursor()
        try:
            cursor.execute("SELECT * FROM usuarios")  
            usuarios = cursor.fetchall() 
            
            return [{'id': usuario[0], 'nombre': usuario[1], 'email': usuario[2], 'telefono': usuario[3]} for usuario in usuarios]
        except Exception as e:
            print(f"Error al obtener usuarios: {e}")
            return []  
        finally:
            cursor.close()


    @staticmethod
    def actualizar_usuario(usuario_id, nombre, email, telefono, password):
        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE Usuarios SET nombre=%s, email=%s, telefono=%s, password=%s
                          WHERE id = %s''', (nombre, email, telefono, password, usuario_id))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def eliminar_usuario(usuario_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM Usuarios WHERE id = %s", (usuario_id,))
        mysql.connection.commit()
        cursor.close()
class Usuario:
    @staticmethod
    def obtener_usuario_por_email(email):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Usuarios WHERE email = %s", (email,))
        usuario = cursor.fetchone()  # Obtener el primer resultado
        cursor.close()
        return usuario  # Retornar el usuario encontrado