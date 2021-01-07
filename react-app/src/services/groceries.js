export const getGroceries = async (userId) => {
const response = await fetch(`/api/groceries/user/${userId}`, {
    headers: {
        "Content-Type": "application/json",
      }
    });
    return await response.json();
    

}
