export const getGroceries = async (userId) => {
const response = await fetch(`/api/groceries/user/${userId}`, {
    headers: {
        "Content-Type": "application/json",
      }
    });
    return await response.json();
    

}

export const deleteGrocery = async (id) => {
  const response = await fetch(`/api/groceries/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}