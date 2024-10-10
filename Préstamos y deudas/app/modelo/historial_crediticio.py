from mysql.connector import Error
from app import mysql

class HistorialCrediticio:
    @staticmethod
    def crear_historial_crediticio(usuario_id, score, fecha):
        cursor = mysql.connection.cursor()
        try:
            cursor.execute('''INSERT INTO historialcrediticio(usuario_id, score, fecha)
                              VALUES(%s, %s, %s)''', (usuario_id, score, fecha))
            mysql.connection.commit()
            historial_id = cursor.lastrowid
            return historial_id
        except Error as e:
            print(f"Error al crear historial crediticio: {e}")
            return None
        finally:
            cursor.close()

    @staticmethod
    def obtener_historiales():
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM historialcrediticio")
        historiales = cursor.fetchall()
        cursor.close()
        return historiales

    @staticmethod
    def obtener_historial_por_id(historial_id):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM historialcrediticio WHERE id = %s", (historial_id,))
        historial = cursor.fetchone()
        cursor.close()
        return historial

    @staticmethod
    def actualizar_historial(historial_id, score, fecha):
        cursor = mysql.connection.cursor()
        cursor.execute('''UPDATE historialcrediticio SET score=%s, fecha=%s
                          WHERE id = %s''', (score, fecha, historial_id))
        mysql.connection.commit()
        cursor.close()

    @staticmethod
    def eliminar_historial(historial_id):
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM historialcrediticio WHERE id = %s", (historial_id,))
        mysql.connection.commit()
        cursor.close()
