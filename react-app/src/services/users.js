
export const editAvatar = async (id, avatar) => {
    const response = await fetch(`/api/users/edit-avatar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    });
    return await response.json();
  }