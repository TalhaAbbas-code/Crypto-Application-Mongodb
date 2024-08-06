import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user, setUser, userinfo, setUserInfo } = UserAuth();

  //   useEffect(() => {
  //     onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
  //       /*onSnapshot sets up a real-time listener to the specific document users/${user?.email}.
  // Whenever the data in this document changes (e.g., fields within the document like watchList are updated), the provided callback function will execute.*/
  //       setCoins(doc.data()?.watchList);
  //     });
  //   }, [user?.email]);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       console.log("trying to get saved coins");
  //       const response = await axios.get(
  //         `http://localhost:8000/api/auth/user/watchlist/${user.email}`
  //       );
  //       const data = response.data.watchList;
  //       console.log(data, "got saved coins");
  //       setCoins(data);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userinfo?.watchList]);

  const deleteCoin = async (passedid) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/delete/watchlist/${user.id}`,
        { passedid }
      );

      // const data = response.data;

      setUserInfo(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  return (
    <div>
      {userinfo?.watchList?.length === 0 ? (
        <p>
          You don't have any coins saved. Please save a coin to add it to your
          watch list. <Link to="/">Click here to search coins.</Link>
        </p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">Coin</th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {userinfo?.watchList?.map((coin) => (
              <tr key={coin.id} className="h-[60px] overflow-hidden">
                <td>{coin?.market_cap_rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img src={coin?.image} className="w-8 mr-4" alt="/" />
                      <div>
                        <p className="hidden sm:table-cell">{coin?.name}</p>
                        <p className="text-gray-500 text-left text-sm">
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="pl-8">
                  <AiOutlineClose
                    onClick={() => deleteCoin(coin.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
