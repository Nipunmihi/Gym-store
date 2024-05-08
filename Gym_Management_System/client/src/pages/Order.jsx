import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cat from "../img/fff.jpg";


export default function Order() {
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuserId = currentUser ? currentUser._id : null;
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [query, setQuery] = useState(" ");
  const [filteredOrderDetailsList, setFilteredOrderDetailsList] = useState([]);

  console.log(orderDetailsList);
  console.log(
    orderDetailsList.filter(
      (order) => order.totalPrice && order.totalPrice.toString().includes("44")
    )
  );
  console.log(
    orderDetailsList.filter((order) =>
      order.items.some(
        (item) => item.ItemsN && item.ItemsN.toLowerCase().includes("ee")
      )
    )
  );

  //after submit form display data order page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items/itemDetails/${CurrentuserId}`);
        const data = await response.json();

        if (data.length > 0) {
          setOrderDetailsList(data);
          setFilteredOrderDetailsList(data);
        } else {
          setOrderDetailsList([]);
          setFilteredOrderDetailsList([]);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [CurrentuserId]);

  //search the data in the order page usign item name
  const handleSearch = () => {
    const filteredData = orderDetailsList.filter((order) =>
      order.items.some(
        (item) =>
          item.ItemsN && item.ItemsN.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredOrderDetailsList(filteredData);
  };

  return (
    <div>
      <div>
        <div className="h-[600px] relative">
          {" "}
          {/* Added relative class */}
          <img src={Cat} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0">
            {" "}
            {/* Positioned Dash component here */}
          </div>{" "}
          {/* Added object-cover class */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
            <div>
              <div className="ml-8 mt-7 mb-10 flex justify-center items-center">
                <form>
                  <input
                    type="text"
                    
                    placeholder="Search... "
                    className=" w-[200px=] h-8 rounded-lg  shadow-lg"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
                <button onClick={handleSearch}>
                  <FontAwesomeIcon className="bg-white rounded-lg ml-2 w-8 h-4 bg-opacity-25 " icon={faSearch} />
                </button>
              </div>
                

            <div className="max-h-[450px] overflow-y-auto">
              {filteredOrderDetailsList.length > 0 ? (
                filteredOrderDetailsList.map((order, index) => (
                  <div key={index} className="ml-20 bg-white bg-opacity-20 border h-[450px] w-[500px] rounded-lg border-white mb-14">
                     
                    <h2 className="text-xl ml-4 font-serif">
                      Order {index + 1} Details
                    </h2>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Phone Number:</p>
                      <p className="ml-5 font-serif text-black"> {order.PNumber}</p>
                    </div>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Total Price: </p>
                      <p className="ml-5"> Rs. {order.totalPrice}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">Number of Items: </p>
                      <p className="ml-5"> {order.items.length}</p>
                    </div>

                    <div className="flex justify-center items-center">
                      <p className="font-serif text-lg">User ID: </p>
                      <p className="ml-5"> {order.CurrentuserId}</p>
                    </div>

                    <div className="flex justify-center items-center ">
                      <p className="font-serif text-lg">Date: </p>
                      <p className="ml-5">
                        {" "}
                        {moment(order.updatedAt).format(
                          "YYYY-MM-DD hh:mm:ss a"
                        )}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-xl font-serif ml-8">Items</h2>
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <div className="flex  ml-10 gap-4">
                            <div className="font-serif text-sm mb-2 text-black truncate w-32">
                              {item.ItemsN}
                            </div>
                            <p className="font-serif text-black text-sm">
                              Rs.{item.price}
                            </p>
                            <p className="text-black font-serif text-sm">
                              Order Items-{item.quantity}
                            </p>
                          </div>
                          <hr className="h-1 bg-slate-600 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
                
              ) : (
                <p className="flex justify-center items-center">
                  No orders found.
                </p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
