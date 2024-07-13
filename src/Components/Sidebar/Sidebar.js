import React, { useEffect, useState } from 'react'
import UserProfile from '../UserProfile/UserProfile'
import './Sidebar.css'

// Imported Icons =======>
import {MdToll, MdInsertComment} from 'react-icons/md'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import {AiOutlineSearch} from 'react-icons/ai'

// Imported Images ======>
import userImage from '../../assest/user.png'

// Imported Firebase ====>
import db from '../../firebase'




function Sidebar({ currentUser, signOut }) {
    // get to all Users
    const [allUsers, setAllUsers] = useState([])

    // Search friend
    const [searchInput, setSearchInput] = useState("");

    const [friendList, setFriendList] = useState([]);

     // Function for get to all Users
    useEffect(() => {
        const getAllUsers = async ()=> {
            const data = await db.collection("user1").onSnapshot((snapshot) => {
                // console.log(snapshot.docs);
                setAllUsers(
                    snapshot.docs.filter((doc) => doc.data().email !== 
                    currentUser?.email)
                );
            });
        };

        const getFriends = async () => {
            const data = await db
                .collection("Friendlist")
                .doc(currentUser.email)
                .collection("list")
                .onSnapshot((snapshot) => {
                  setFriendList(snapshot.docs);
            });
        };

        getAllUsers();
        getFriends();
        // console.log('users >>> ', allUsers)
    }, [])

    // Function Search
    // eslint-disable-next-line array-callback-return
    const searchedUser = allUsers.filter((user) => {
        if (searchInput) {
            // console.log(user.data());
            if (
                user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                return user;
            }
        }
    });

    const searchItem = searchedUser.map((user) => {
        return (
            <UserProfile
                name={user.data().fullname}
                photoURL={user.data().photoURL}
                key={user.id}
                email={user.data().email}
            />
        );
    });



    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-img" onClick={signOut}>
            <img src={currentUser?.photoURL} alt="user-img" />
          </div>
          <div className="sidebar-header-btn">
            <MdToll className="iconReact" />
            <MdInsertComment className="iconReact" />
            <BiDotsVerticalRounded className="iconReact" />
          </div>
        </div>

        <div className="sidebar-search">
          <div className="sidebar-search-input">
            <AiOutlineSearch className="iconReact" />
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="sidebar-chat-list">
          {searchItem.length > 0
            ? searchItem
            : friendList.map((friend) => (
                <UserProfile
                  name={friend.data().fullname}
                  photoURL={friend.data().photoURL}
                  lastMessage={friend.data().lastMessage}
                  email={friend.data().email}
                />
              ))}
        </div>
      </div>
    );
}

export default Sidebar
