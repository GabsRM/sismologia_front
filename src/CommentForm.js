import React, { useState } from "react";
import axios from "axios";

function CommentForm({ onSubmit, featureId }) {
  const [commentBody, setCommentBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentBody.trim()) { 
      setErrorMessage("El comentario no puede estar vacío");
      return;
    }

    onSubmit(featureId, commentBody); 

    axios
      .post(`http://127.0.0.1:3000/api/features/${featureId}/comments`, {
        body: commentBody,
      })
      .then((response) => {
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
      });

    
    setCommentBody("");
    setErrorMessage(""); 
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Enviar comentario</button>
      </form>
    </div>
  );
}

export default CommentForm;
