from mysql.connector import Error
from app import mysql

class Prestamo:
    @staticmethod
    def crear_prestamo(usuario_id, monto, fecha_inicio, fecha_fin, interes):
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('''INSERT INTO Prestamos(usuario_id, monto, fecha_inicio, fecha_fin, interes)
                              VALUES(%s, %s, %s, %s, %s)''', (usuario_id, monto, fecha_inicio, fecha_fin, interes))
            mysql.connection.commit()
            prestamo_id = cursor.lastrowid
            return prestamo_id
        except Error as e:
            print(f"Error al crear préstamo: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def obtener_prestamos():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Prestamos")
        prestamos = cursor.fetchall()
        cursor.close()
        return prestamos

    @staticmethod
    def obtener_prestamo_por_id(prestamo_id):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Prestamos WHERE id = %s", (prestamo_id,))
        prestamo = cursor.fetchone()
        cursor.close()
        return prestamo

    @staticmethod
    def actualizar_prestamo(prestamo_id, monto, fecha_inicio, fecha_fin, interes):
        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE Prestamos SET monto=%s, fecha_inicio=%s, fecha_fin=%s, interes=%s
                          WHERE id = %s''', (monto, fecha_inicio, fecha_fin, interes, prestamo_id))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def eliminar_prestamo(prestamo_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM Prestamos WHERE id = %s", (prestamo_id,))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def verificar_aceptacion_prestamo(usuario_id, monto):
        # Aquí debes implementar la lógica para verificar el historial crediticio
        # Este es un ejemplo básico
        cursor = mysql.connection.cursor()

        # Suponiendo que tienes una tabla HistorialCrediticio para verificar
        cursor.execute("SELECT score FROM historialcrediticio WHERE usuario_id = %s", (usuario_id,))
        resultado = cursor.fetchone()
        
        if resultado:
            score_crediticio = resultado['score']
            # Lógica para decidir si el préstamo es aceptado
            if score_crediticio > 600:  # Por ejemplo, aceptamos si el score es mayor a 600
                cursor.close()
                return True
            else:
                cursor.close()
                return False
        else:
            cursor.close()
            return False  # Si no hay historial, rechazamos el préstamo