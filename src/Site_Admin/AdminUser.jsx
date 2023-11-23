// import { useState, useEffect } from "react";
// import axios from "../API/axios";
// const USERLIST_URL = "/api/customers";

// function AdminUser() {
//   const [users, setUsers] = useState();

//   useEffect(() => {
//     let isMounted = true;
//     const controller = new AbortController();

//     const getUsers = async () => {
//       try {
//         const response = await axios.get(USERLIST_URL, {
//           signal: controller.signal,
//         });
//         console.log(response.data);
//         if (isMounted) {
//           setUsers(response.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//       getUsers();

//       return () => {
//         isMounted = false;
//         controller.abort();
//       };
//     };
//   }, []);

//   return (
//     <div>
//       <div>Danh sách người dùng</div>
//       {users?.length ? (
//         <ul>
//           {users.map((user, i) => (
//             <li key={i}>{user?.username}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users to display</p>
//       )}
//     </div>
//   );
// }
// export default AdminUser;
