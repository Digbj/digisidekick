import React, { useState, useEffect } from 'react';

function AllUser() {
  const [allUser, setAllUser] = useState([]);
  const [editedUserId, setEditedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/alluser');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setAllUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/delete/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully');
        setAllUser((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // removing  the deleted user from the state
      } else {
        console.log('Error deleting user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (userId) => {
    setEditedUserId(userId);
  };

  const handleSave = async (userId) => {
    try {
      const userToUpdate = allUser.find((user) => user._id === userId);

      const response = await fetch(`http://localhost:8080/edit/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: userToUpdate.name,
          email: userToUpdate.email,
          phone: userToUpdate.phone,
          address: userToUpdate.address,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log('User edited successfully');
        setEditedUserId(null); // Reset the currently edited user ID
      } else {
        console.log('Error editing user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone NO</td>
            <td>Address</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user) => (
            <tr key={user._id}>
              <td>
                {editedUserId === user._id ? (
                  <input
                    value={user.name}
                    onChange={(e) =>
                      setAllUser((prev) =>
                        prev.map((u) =>
                          u._id === user._id ? { ...u, name: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editedUserId === user._id ? (
                  <input
                    value={user.email}
                    onChange={(e) =>
                      setAllUser((prev) =>
                        prev.map((u) =>
                          u._id === user._id ? { ...u, email: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editedUserId === user._id ? (
                  <input
                    value={user.phone}
                    onChange={(e) =>
                      setAllUser((prev) =>
                        prev.map((u) =>
                          u._id === user._id ? { ...u, phone: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editedUserId === user._id ? (
                  <input
                    value={user.address}
                    onChange={(e) =>
                      setAllUser((prev) =>
                        prev.map((u) =>
                          u._id === user._id ? { ...u, address: e.target.value } : u
                        )
                      )
                    }
                  />
                ) : (
                  user.address
                )}
              </td>
              <td>
                {editedUserId === user._id ? (
                  <>
                    <button onClick={() => handleSave(user._id)}>Save</button>
                    <button onClick={() => setEditedUserId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                    <button onClick={() => handleEdit(user._id)}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
