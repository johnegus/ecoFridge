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

export const editGrocery = async (grocery_id, item_name) => {
  const response = await fetch(`/api/groceries/edit/${grocery_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grocery_id,
      item_name,
    }),
  });
  return await response.json();
}


export const addGrocery = async (user_id, item_name, grocery_types_id) => {
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
  console.log(response)
  return await response.json();
}