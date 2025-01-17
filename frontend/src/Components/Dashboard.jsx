import { useState, useEffect } from "react";
import axios from "axios";
import UserIcon from "./UserIcon";
import Users from "./Users";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await axios.get(
          "https://payment-wallet-b6m6.onrender.com/api/v1/account/details",
          { withCredentials: true }
        );
        setData(accountResponse.data);

        const usersResponse = await axios.get(
          "https://payment-wallet-b6m6.onrender.com/api/v1/user/users",
          { withCredentials: true }
        );
        setUsers(usersResponse.data.users || []);
        setFilteredUsers(usersResponse.data.users || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        const userName = user.name || `${user.firstName} ${user.lastName}`;
        return userName.toLowerCase().includes(lowercasedSearchTerm);
      });

      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleSignOut = async () => {
    try {
      await axios.post("https://payment-wallet-b6m6.onrender.com/api/v1/user/signout", {}, { withCredentials: true });
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold">Payments App</div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">Hello, {data?.firstName}</span>
          <UserIcon firstName={data?.firstName} lastName={data?.lastName} />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSignOut}
          className="bg-black text-white py-2 px-4 rounded-md"
        >
          Sign Out
        </button>
      </div>

      <div className="mt-10">
        <div className="text-2xl font-bold">Your Balance: Rs {data?.balance}/-</div>
      </div>

      <div className="mt-10">
        <label htmlFor="searchUsers" className="block text-2xl font-bold">
          Users
        </label>
        <input
          type="text"
          id="searchUsers"
          placeholder="Search users..."
          className="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-6">
        {filteredUsers.length > 0 ? (
          <Users users={filteredUsers} />
        ) : (
          <div>No users found</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
