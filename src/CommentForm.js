import React, { useState } from "react";
import axios from "axios";

function CommentForm({ onSubmit, featureId }) {
  const [commentBody, setCommentBody] = useState("");
  let show = false;

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(featureId, commentBody); // Enviamos featureId y el cuerpo del comentario a la función onSubmit
    console.log(featureId);
 

    axios
      .post(`http://127.0.0.1:3000/api/features/${featureId}/comments`, {
        body: commentBody,
      })
      .then((response) => {
        console.log(response);
        show = true;
      })
      .catch((error) => {
        console.log(error);
      });

    // Limpia el campo de comentario después de enviar.
    setCommentBody("");
  };

  return (
    <div>
      <h2>Deja tu comentario</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentBody}
          onChange={handleChange}
          placeholder="Escribe tu comentario aquí..."
          rows={4}
          cols={50}
        />
        <br />
       
        <button type="submit">Enviar comentario </button>
      </form>
    </div>
  );
}

export default CommentForm;
