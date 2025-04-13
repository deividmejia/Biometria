import mysql.connector
from datetime import datetime

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="nosedice",
        database="umg_biometria"
    )

def log_event(empleado_id, imagen_path):
    conn = get_connection()
    cursor = conn.cursor()
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    sql = "INSERT INTO EVENT_LOG (empleado_id, fecha_hora, imagen_path) VALUES (%s, %s, %s)"
    val = (empleado_id, now, imagen_path)
    cursor.execute(sql, val)
    conn.commit()
    conn.close()