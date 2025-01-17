import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";

function Users({ users }) {
  const navigate = useNavigate();

  const handleSendMoney = (email) => {
    navigate(`/send?email=${email}`);
  };

  return (
    <div className="mt-6">
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center mt-6 mb-4">
              <span className="flex items-center space-x-2">
                <UserIcon firstName={`${user.firstName[0]}`} lastName={`${user.lastName[0]}`} />
                <span className="text-xl font-bold m-2">{user.firstName} {user.lastName}</span>
              </span>
              <button
                className="bg-black text-l p-3 rounded-md text-white"
                onClick={() => handleSendMoney(user.email)}
              >
                Send Money
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default Users;
