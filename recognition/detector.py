import face_recognition
import numpy as np
import cv2
import datetime
import os
from database.db import get_connection, log_event
from PIL import Image
import io

# Cargar datos previamente entrenados
import pickle
with open("modelo/known_encodings.pkl", "rb") as f:
    known_data = pickle.load(f)

known_encodings = known_data["encodings"]
known_ids = known_data["ids"]
known_names = known_data["names"]

def recognize_face(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for face_encoding, face_location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(known_encodings, face_encoding)
        face_distances = face_recognition.face_distance(known_encodings, face_encoding)

        if True in matches:
            best_match_index = np.argmin(face_distances)
            empleado_id = known_ids[best_match_index]
            empleado_nombre = known_names[best_match_index]

            # Guardar imagen del evento
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"events/{empleado_id}_{timestamp}.jpg"
            os.makedirs("events", exist_ok=True)
            cv2.imwrite(filename, frame)

            # Registrar evento en base de datos
            log_event(empleado_id, filename)

            return {"access": True, "empleado": empleado_nombre}

    return {"access": False}