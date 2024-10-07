from mysql.connector import Error
from app import mysql

class Pago:
    @staticmethod
    def crear_pago(prestamo_id, fecha_pago, monto_pago, comentario):
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('''INSERT INTO Pagos(prestamo_id, fecha_pago, monto_pago, comentario)
                              VALUES(%s, %s, %s, %s)''', (prestamo_id, fecha_pago, monto_pago, comentario))
            mysql.connection.commit()
            pago_id = cursor.lastrowid
            return pago_id
        except Error as e:
            print(f"Error al crear pago: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def obtener_pagos():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Pagos")
        pagos = cursor.fetchall()
        cursor.close()
        return pagos

    @staticmethod
    def obtener_pago_por_id(pago_id):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM Pagos WHERE id = %s", (pago_id,))
        pago = cursor.fetchone()
        cursor.close()
        return pago

    @staticmethod
    def actualizar_pago(pago_id, fecha_pago, monto_pago, comentario):
        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE Pagos SET fecha_pago=%s, monto_pago=%s, comentario=%s
                          WHERE id = %s''', (fecha_pago, monto_pago, comentario, pago_id))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def eliminar_pago(pago_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM Pagos WHERE id = %s", (pago_id,))
        mysql.connection.commit()
        cursor.close()
