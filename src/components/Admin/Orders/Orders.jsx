import { useState } from 'react'
import { useUserContext } from '../../../context/UserContext/UserProvider';
import { FaSearch } from "react-icons/fa";
import User from './Order';

const Orders = () => {
    const [{ users }, userDispatch] = useUserContext();
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    const filterUsers = () => {
        if(query.length === 0) {
          setFilteredUsers(users);
        }else{
          const filter = users.filter((item) => item.displayName.toLowerCase().includes(query.toLowerCase()));
          setFilteredUsers(filter);
        }
    }

    const searchUsers = (e) => {
        setQuery(e.target.value);
        filterUsers();
    }

  return (
    <div className="flex flex-col justify-center w-full">
    <div className="flex justify-center w-full p-2 mb-4 bg-white rounded-lg">
      <input
        className="w-full p-2 rounded-lg outline-none "
        type="text"
        placeholder="Search user"
        value={query}
        onChange={(e) => searchUsers(e)}
      />
      <button className="flex items-center justify-center gap-3 px-4 py-2 font-bold text-orange-700 rounded-lg">
        <FaSearch />
      </button>
    </div>
    <div className="grid w-full grid-cols-1 gap-1">
      {
        filteredUsers.map((user) => (
          <User key={user.uid} item = {user} />
        ))
      }
    </div>
  </div>
  )
}

export default Orders