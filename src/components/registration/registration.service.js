export const signUp = async (signUpData) => {
  try {
    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la registrazione");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore nella funzione signUp:", error);
    throw error; // Rilancia l'errore per gestirlo nel componente
  }
};