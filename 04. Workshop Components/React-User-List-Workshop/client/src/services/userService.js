const url = 'http://localhost:3005/api/users';

export async function getAll() {
    const response = await fetch(url);
    const result = await response.json();
    return result.users;
}

export async function getUserById(id) {
    const response = await fetch(`${url}/${id}`);
    const result = await response.json();
    return result.user;
}

export async function createUser(user) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
    const result = await response.json();
    return result.user;
}

export async function updateUser(user) {
    const response = await fetch(`${url}/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
    const result = await response.json();
    return result.user;
}

export async function deleteUser(id) {
    const response = await fetch(`${url}/${id}`, {
        method: "DELETE"
      });
    const result = await response.json();
    return result.userId;
}