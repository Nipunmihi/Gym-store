import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cat from "../img/men.jpg";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [Items, setItems] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/items/getAllItems`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      const selectItem = Items.find((item) => item._id === itemId);
      if (!selectItem) {
        throw new Error("Item not found");
      }

      const response = await fetch(`http://localhost:3000/api/items/Cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ItemId: selectItem._id,
          CurrentuserId: currentUser._id,
          ItemsN: selectItem.ItemsN,
          image: selectItem.image,
          price: selectItem.price,
          quantity: selectItem.quantity,
          Description: selectItem.Description,
        }),
      });

      if (!response.ok) {
        setNotification("Out of stock");
      } else {
        setNotification("successful");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCart = () => {
    if (currentUser) {
      handleAddToCart();
    } else {
      window.scrollTo(0, 0);
      navigate("/sign-in");
    }
  };




  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Items]);
    } else {
      // If there's a query, filter the data
      const filteredData = Items.filter(
        (item) =>
        item.ItemsN &&  item.ItemsN.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Items]);







  return (
    <div>
      <div>
        <div className="h-[600px] relative">
          {" "}
          {/* Added relative class */}
          <img src={Cat} alt="" className="w-full h-full object-cover" />

          <div className="ml-8 mt-[-600px] flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
         
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-14 mt-5">
            <div className="w-[1200px] h-[500px] mt-[-40px] rounded-lg bg-opacity-20 border border-white bg-slate-100">
              <div className="max-h-96 overflow-y-auto">
                <div>
                  <div className="mt-10 mb-[-40px]">
                    <h className="text-[30px] ml-20 font-extralight text-white ">
                      SUPPLEMENT STORE
                    </h>
                  </div>

                  <div className="flex justify-center mt-4">
                    <div className="flex flex-wrap justify-center">
                      {filter && filter.length > 0 ? (
                        <>
                          {filter.slice(0, showMore ? filter.length : 7).map(
                            (item) => (
                              <div
                                key={item._id}
                                className="w-[200px] h-[200px]  mt-10 mb-20 rounded  shadow-xl "
                              >
                                <Link to={`/item/${item._id}`}>
                                  <img
                                    className="w-[100px] rounded-xl border border-white h-[100px] ml-4"
                                    src={item.image[0]}
                                    alt={item.ItemsN}
                                  />
                                </Link>
                                <div className="px-6 py-4">
                                  <Link to={`/item/${item._id}`}>
                                    <div className="font-extralight text-xl text-white mb-2 truncate w-32">
                                      {item.ItemsN}
                                    </div>
                                    <p className="font-extralight  text-white text-base">
                                      Rs.{item.price}
                                    </p>

                                    <p className="font-extralight  text-white text-base">
                                      {item.quantity}-Item
                                    </p>
                                  </Link>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                  {currentUser ? (
                                    <button
                                      className="bg-blue-800 hover:text-black text-white font-extralight py-2 px-2 border border-white  rounded-lg"
                                      onClick={() => handleAddToCart(item._id)}
                                    >
                                      Add to Cart
                                    </button>
                                  ) : (
                                    <button
                                      className="bg-blue-800 hover:text-black text-white font-extralight py-2 px-2 border border-white  rounded-lg"
                                      onClick={handleCart}
                                    >
                                      Add to Cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            )
                          )}

                          {notification && (
                            <>
                              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-50"></div>
                              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                                <div>
                                  <div className=" ">
                                    
                                    <h className="text-black bg-white bg-opacity-60 flex justify-center  items-cente text-center py-20 px-28 rounded-xl font-extralight text-3xl">
                                      {notification}
                                    </h>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          {!showMore && filter.length > 7 && (
                            <div className="mt-8 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                                onClick={() => setShowMore(true)}
                              >
                                Show More
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p>You have no items yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
