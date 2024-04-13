import React, { useState } from "react";
import { useFetch } from "./useFetch"; // Asegúrate de importar correctamente useFetch desde el archivo correspondiente
import CommentForm from "./CommentForm"; // Importa el componente CommentForm que creamos anteriormente
function App() {
  const data = useFetch(
    "http://127.0.0.1:3000/api/features?page=1&per_page=9&mag_type%5B%5D=md%27"
  );
  const [currentComment, setCurrentComment] = useState("");

  const handleCommentSubmit = (featureId, comment) => {
    console.log("Comentario enviado para el sismo", featureId, ":", comment);
    setCurrentComment(comment);
  };

  function sendComment(featureId) {
    console.log(featureId);
    return (comment) => handleCommentSubmit(featureId, comment);
  }

  return (
    <div className="earthquake-container">
      <h2 className="earthquake-title">Datos de sismología</h2>
      {data ? (
        <div className="earthquake-list">
          {data.data.map((earthquake) => (
            <div key={earthquake.id} className="earthquake-item">
              <h3>{earthquake.attributes.title}</h3>
              <p>
                <strong>Magnitude:</strong> {earthquake.attributes.magnitude}
              </p>
              <p>
                <strong>Place:</strong> {earthquake.attributes.place}
              </p>
              <p>
                <strong>Time:</strong> {earthquake.attributes.time}
              </p>
              <CommentForm
                onSubmit={sendComment(earthquake.id)}
                featureId={earthquake.id}
              />
              {console.log(earthquake.id)}
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default App;
