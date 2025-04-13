import cv2
import os
import mysql.connector
import time

DB_CONFIG = {
    "host": "localhost",
    "user": "root",%
    "password": "nosedice",
    "database": "umg_biometria"
}

def insertar_empleado(nombre):
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    sql = "INSERT INTO EMPLEADOS (nombre) VALUES (%s)"
    cursor.execute(sql, (nombre,))
    conn.commit()
    empleado_id = cursor.lastrowid
    conn.close()
    return empleado_id

def capturar_rostros(nombre_empleado, output_dir='dataset'):
    empleado_id = insertar_empleado(nombre_empleado)

    folder_name = f"{empleado_id}_{nombre_empleado.replace(' ', '_')}"
    output_path = os.path.join(output_dir, folder_name)
    os.makedirs(output_path, exist_ok=True)

    cap = cv2.VideoCapture(0)
    print(f"Listo para capturar imágenes de: {nombre_empleado} (ID {empleado_id})")
    print("Presiona ESPACIO para iniciar la captura automática de 50 imágenes...")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        cv2.imshow("Vista previa", frame)
        k = cv2.waitKey(1)

        if k % 256 == 27:  # ESC
            break

        elif k % 256 == 32:  # ESPACIO
            print("🟢 Capturando automáticamente 50 imágenes... muévete lentamente 😄")
            for count in range(50):
                ret, frame = cap.read()
                if not ret:
                    break

                filename = os.path.join(output_path, f"{nombre_empleado}_{count}.jpg")
                cv2.imwrite(filename, frame)
                print(f"Imagen {count+1}/50 guardada")
                time.sleep(0.15)  # pausa breve para cambiar expresión/ángulo

            print("✅ Captura completa.")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    nombre = input("Nombre del empleado: ")
    capturar_rostros(nombre)