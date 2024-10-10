from mysql.connector import Error
from app import mysql

class Deuda:
    @staticmethod
    def crear_deuda(usuario_id, monto, descripcion, fecha_vencimiento):
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('''INSERT INTO Deudas(usuario_id, monto, descripcion, fecha_vencimiento)
                              VALUES(%s, %s, %s, %s)''', (usuario_id, monto, descripcion, fecha_vencimiento))
            mysql.connection.commit()
            deuda_id = cursor.lastrowid
            return deuda_id
        except Error as e:
            print(f"Error al crear deuda: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def obtener_deudas():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Deudas")
        deudas = cursor.fetchall()
        cursor.close()
        return deudas

    @staticmethod
    def obtener_deuda_por_id(deuda_id):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Deudas WHERE id = %s", (deuda_id,))
        deuda = cursor.fetchone()
        cursor.close()
        return deuda

    @staticmethod
    def actualizar_deuda(deuda_id, monto, descripcion, fecha_vencimiento):
        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE Deudas SET monto=%s, descripcion=%s, fecha_vencimiento=%s
                          WHERE id = %s''', (monto, descripcion, fecha_vencimiento, deuda_id))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def eliminar_deuda(deuda_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM Deudas WHERE id = %s", (deuda_id,))
        mysql.connection.commit()
        cursor.close()
