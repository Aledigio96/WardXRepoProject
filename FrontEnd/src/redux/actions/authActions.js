export const login = (user, token) => ({
  type: "LOGIN",
  payload: { user, token },
});

export const logout = () => (dispatch) => {
  // Resetta lo stato dell'utente a null
  dispatch({ type: "LOGOUT" });

  // Rimuove il token dal localStorage o sessionStorage
  localStorage.removeItem("token");

  // Se hai bisogno di fare un redirect (ad esempio alla pagina di login)
  window.location.href = "/"; // O usa React Router per un redirect
};

export const uploadAvatar = (file, token) => async (dispatch) => {
  if (!token) {
    dispatch({
      type: "UPLOAD_AVATAR_ERROR",
      payload: "Token mancante, effettua di nuovo il login",
    });
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:3001/api/users/avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Errore nel caricamento dell'avatar");
    }

    // Ottieni l'URL direttamente come testo
    const data = await response.text(); // Risposta come stringa (URL)

    // Ora usa l'URL per aggiornare lo stato
    dispatch({
      type: "UPLOAD_AVATAR_SUCCESS",
      payload: data, // data è l'URL dell'avatar
    });
  } catch (error) {
    console.error("Errore nel caricamento dell'avatar:", error);
    dispatch({
      type: "UPLOAD_AVATAR_ERROR",
      payload: error.message,
    });
  }
};

export const loadAnnunci = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/annunci");
    if (!response.ok) {
      throw new Error("Errore nel recupero degli annunci");
    }
    const data = await response.json();
    dispatch({
      type: "LOAD_ANNUNCI",
      payload: data,
    });
  } catch (error) {
    console.error("Errore nel recupero degli annunci:", error);
    dispatch({
      type: "LOAD_ANNUNCI_ERROR",
      payload: error.message,
    });
  }
};

export const fillCart = (prodotto) => {
  return {
    type: "FILL_CART",
    payload: prodotto,
  };
};
