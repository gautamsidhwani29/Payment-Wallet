import { useEffect ,useState} from "react";
import { replace, useLocation, useNavigate, useRevalidator } from "react-router-dom";
import UserIcon from "./UserIcon";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function SendMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

    const handleTransfer = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:3000/api/v1/account/transfer", { to: email, amount },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Transfer successful", response.data);
        })
        .catch((error) => {
          console.error("Transfer failed", error);
        });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <div className="bg-white p-8 rounded-md shadow-md w-96">
          <div className="flex justify-start mb-4 text-2xl font-black" onClick={()=>{navigate("/dashboard",{replace :true})}}><FontAwesomeIcon icon={faArrowLeft} /> </div>
            <div className="flex justify-center mb-4"><UserIcon firstName={email ? email.toString(0) : " "} lastName={" "}/></div>
            <h2 className="text-2xl font-bold text-center mb-4">Sending to {email}</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount(in Rs)
                </label>
                <input type="amount" id="amount" placeholder="Enter Amount to be sent"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={e=>setAmount(e.target.value)}
                />
              </div>
              <button  onClick={(e)=>{
                handleTransfer(e)
                navigate("/dashboard", {replace : true});
                alert("Transfer was Successfull")
              }}type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-gray-800 transition">
                Initiate Transfer
              </button>
            </form>
          </div>
        </div>
      );
}

export default SendMoney;