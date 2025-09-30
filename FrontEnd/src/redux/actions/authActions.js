export const login = (user, token) => {
  // Salva in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return {
    type: "LOGIN",
    payload: { user, token },
  };
};

export const setUserFromStorage = (user, token) => ({
  type: "SET_USER_FROM_STORAGE",
  payload: { user, token },
});
export const setUserProfile = (user) => ({
  type: "SET_USER_PROFILE",
  payload: user,
});
export const logout = () => (dispatch) => {
  // Resetta lo stato dell'utente a null
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Rimuove il token dal localStorage o sessionStorage
  localStorage.removeItem("token");

  window.location.href = "/";
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

    const data = await response.text();

    dispatch({
      type: "UPLOAD_AVATAR_SUCCESS",
      payload: data,
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
