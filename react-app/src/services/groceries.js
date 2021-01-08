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


export const addGrocery = async (user_id, item_name, grocery_types_id) => {
  console.log(user_id, item_name, grocery_types_id)
  const response = await fetch(`/api/groceries/new/${user_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      item_name,
      grocery_types_id
    }),
  });
  return await response.json();
}