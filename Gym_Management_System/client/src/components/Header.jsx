import { useEffect, useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import log from "../img/log.jpg";
import DropdownMenu from "./DropdownMenu";
import { signoutSuccess } from "../redux/user/userSilce";
import { useDispatch } from "react-redux";

export default function () {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  console.log(totalItems);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isDropdownOpen &&
        event.target.closest(".dropdown-menu") === null &&
        event.target.closest("button") === null
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const CurrentuserId = currentUser ? currentUser._id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/cartitem/${CurrentuserId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setTotalItems(data.length);
        } else {
          setTotalItems(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

















  return (
    <div className="bg-black">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
      <Link to="/">
          <h1 className="font-bold text-white">The gym</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-white">Home</li>
          </Link>

          {currentUser && currentUser.isStoreManger && (
            <Link to="/profil">
            <li className="text-white">Dashbord</li>
          </Link>
          )}

          {currentUser ? (
            <>
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <div className="relative">
                    <MdShoppingCart className="text-2xl text-blue-500" />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </div>
                  </div>
                </button>
                {isDropdownOpen && (
                  <DropdownMenu
                    isOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                  />
                )}
              </div>
              <Link to="/order">
                <h1 className="text-white">payment</h1>
              </Link>

              <Link to={"/profil"}>
              <span onClick={handleSignout} className="cursor-pointer text-white">
           Sign Out
         </span>
              </Link>
            </>
          ) : (
            <Link to="/sign-in">
              <li className="text-white">Sing In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
