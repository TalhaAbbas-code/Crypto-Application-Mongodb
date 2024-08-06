import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import axios from "axios";
import {
  arrayUnion,
  arrayRemove,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState({});
  const [iscoin, setiscoin] = useState(false);
  const { user, setUser, userinfo, setUserInfo } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
   
    
      try {
        console.log(coin);
          const response = await axios.post(
            `http://localhost:8000/api/auth/save/watchlist/${user.id}`,
            { coin }
          );
         // const data = response.data;
         
         setUserInfo(response.data.user);
         
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      useEffect(() => {
        console.log("Watchlist updated:", userinfo.watchList);
        setSavedCoin(userinfo.watchList);
        //  console.log(savedCoin,"this is saved coin");
        userinfo?.watchList?.map((item, index) => {
          if (item.id === coin.id) {
            setiscoin(true);
          }
        });
        // You can perform any side effects here, like updating localStorage, making further API calls, etc.
      }, [userinfo?.watchList]);
  

  // useEffect(() => {
  //   onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
  //     setSavedCoin(doc.data()?.watchList);
  //     doc.data()?.watchList.map((item, index) => {
  //       if (item.id === coin.id) {
  //         setiscoin(true);
  //       }
  //     });
  //   });
  // }, [user?.email]);
 


  const deleteCoin = async (passedid) => {
    console.log("delete click");
     try {
       console.log(coin);
       const response = await axios.post(
         `http://localhost:8000/api/auth/delete/watchlist/${user.id}`,
         { passedid }
       );
       
        console.log(iscoin);
       // const data = response.data;
       console.log(response.data);
       setUserInfo(response.data.user);
       setiscoin(false);
       
     } catch (error) {
       console.error("Failed to fetch user data:", error);
     }
  };

  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td>
        {iscoin ? (
          <AiFillStar onClick={() => deleteCoin(coin.id)} />
        ) : (
          <AiOutlineStar onClick={saveCoin} />
        )}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className="flex items-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="w-[180px] hidden md:table-cell">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="w-[180px] hidden sm:table-cell">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
