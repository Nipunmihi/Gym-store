import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutDetails from "./CheckoutDetails";

export default function DropdownMenu({ isOpen, toggleDropdown }) {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState("");
  console.log(items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [itemsId, setitemsId] = useState("");
  const [notification, setNotification] = useState(null);
  console.log("Id", itemsId);
  const CurrentuserId = currentUser ? currentUser._id : null;

  // after click the add to cart save database after display in the dropdown menu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/cartitem/${CurrentuserId}`);
        const data = await response.json();

        console.log("data", data);

        if (data.length > 0) {
          setItems(data);

          const totalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(totalPrice);
        } else {
          setItems(null);
          setTotalPrice(0);
        }
      } catch (error) {
        console.error("Error fetching bid data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

  //add cart popup window
  const handleCheckout = () => {
    setShowCheckoutPopup(true);
  };

  //cart popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup(false);
  };

  //cart include items remove
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/items/deleteitems/${itemsId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setNotification("Try again");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setNotification("Remove");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setting the itemsId state and then immediately calling the handleDeleteUser function.
  //should ensure that the itemsId state is correctly set before calling the handleDeleteUser function.
  //whenever the itemsId state changes, ensuring that the delete request is sent with the correct itemsId value.
  useEffect(() => {
    if (itemsId !== "") {
      handleDeleteUser();
    }
  }, [itemsId]);

  return (
    <div className={`dropdown-menu ${isOpen ? "visible" : "hidden"}`}>
      <div className="absolute z-50">
        <div className="bg-black bg-opacity-80 rounded-lg shadow-xl absolute lg:w-96 lg:ml-[-180px] lg:h-[500px] ml-[-200px] w-[260px] h-[550px] ">
          {items ? (
            <>
              <div className="overflow-y-auto max-h-[350px]">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-opacity-70 border border-white bg-slate-100 shadow-md rounded-md lg:w-full lg:h-20 w-full h-16 mt-4 "
                  >
                    <div className="flex justify-center items-center gap-4 ">
                      <img
                        className="w-[40px] h-[40px] mt-6 ml-4 "
                        src={item.image[0]}
                        alt={item.ItemsN}
                      />

                      <div className="font-extralight text-white mt-2 truncate w-32">
                        {item.ItemsN}
                      </div>
                      <p className="text-white  font-extralight text-sm">
                        Rs.{item.price}
                      </p>
                      <p className="text-gray-700  font-extralight text-sm">
                        {item.quantity}
                      </p>
                      <button
                      className="ml-4 bg-blue-800 rounded-full hover:text-black text-white font-extralight py-1 px-2"
                        onClick={() => {
                          setitemsId(item._id);
                          handleDeleteUser();
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-20 mt-4">
                <h1 className="font-extralight text-white text-md">Number of itmes</h1>
                <p className="font-extralight text-white text-md">{items.length}</p>
              </div>

              <div className="flex justify-center items-center gap-20 mt-4">
                <h1 className="font-extralight text-white text-md">Number of itmes</h1>
                <p className="font-extralight text-white text-md"> Rs.{totalPrice}</p>
              </div>

              {showCheckoutPopup && (
                <CheckoutDetails
                  items={items}
                  totalPrice={totalPrice}
                  onClose={handleClosePopup}
                />
              )}

              <div className="flex justify-center items-center">
                <button
                  className=" bg-blue-800 rounded-full mt-4 hover:text-black text-white font-extralight py-1 px-4"
                  onClick={handleCheckout}
                >
                  check out
                </button>
              </div>
            </>
          ) : (
            <p className="flex justify-center items-center">Loading...</p>
          )}

          {notification && (
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div>
                  <div className="  ">
                    <h1 className="text-black bg-white bg-opacity-60 flex justify-center  items-cente text-center py-20 px-28 rounded-xl font-extralight text-3xl">
                      {notification}
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
