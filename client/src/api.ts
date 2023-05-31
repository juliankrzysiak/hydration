const url = "http://localhost:3001/api/plants";

export const getAllPlants = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
