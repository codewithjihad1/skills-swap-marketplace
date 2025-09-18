"use client";
import { useState } from "react";
import { GrAnnounce, GrDocumentText, GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
// import { BsGraphUp } from "react-icons/bs";
// import MenuItem from './Menu/MenuItem'

// import AdminMenu from './Menu/AdminMenu'
// import { Link, Navigate, NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import {
  MdForum,
  MdManageAccounts,
  MdOutlineDocumentScanner,
  MdOutlinePostAdd,
  MdPostAdd,
} from "react-icons/md";
import { GoReport } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import useRole from "../../../Hooks/useRole";
// import Loading from "../../../Pages/Loading/Loading";
// import { toast } from "react-toastify";
// import useAuth from "../../../Hooks/useAuth";
export default function Sidebar() {
  const pathname = usePathname();

  // Simple menu (no roles)
  const menuItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/manageUsers", label: "Manage Users" },
    { href: "/dashboard/setting", label: "Settings" },
  ];
  // const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  // const [role, isRoleLoading] = useRole();

  // const handleSignOut = () => {
  //   logOut()
  //     .then(() => {
  //       Navigate("/");
  //       toast.warn("Sign Out Successfully");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  // if (isRoleLoading) return <Loading></Loading>;

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link href="/" className="flex items-center">
              <p>
                <MdForum className="w-10 h-10" />
              </p>
              <h2 className="font-bold text-2xl">Skill Share Hub</h2>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#3f72af] text-white mx-auto">
              <Link href="/" className="flex items-center">
                {/* <img src="/assets/DashboardLogo.png" alt="" /> */}
                <h2 className="font-bold text-2xl">Skill Share Hub</h2>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <ul>
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-lg ${
                          isActive
                            ? "bg-gray-300  text-gray-700"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          /> */}
          {/* <button
            onClick={handleSignOut}
            className="flex w-full items-center px-4 py-2 mt-4 hover:bg-gray-300  bg-[#3f72af] text-white hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button> */}
        </div>
      </div>
    </>
  );
}

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";
// type Role = "admin" | "user";
// export default function Sidebar({ role }: { role: Role }) {
//   const pathname = usePathname();

//   // Define menu items by role
//   const menuItems: Record<Role, { href: string; label: string }[]> = {
//     admin: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/users", label: "Manage Users" },
//       { href: "/dashboard/settings", label: "Settings" },
//     ],
//     user: [
//       { href: "/dashboard", label: "Overview" },
//       { href: "/dashboard/profile", label: "Profile" },
//       { href: "/dashboard/orders", label: "My Orders" },
//     ],
//   };

//   return (
//     <div>
//       <aside className="w-64 bg-gray-100 p-4">
//         <h2 className="font-bold text-lg mb-4">Dashboard</h2>
//         <ul className="space-y-2">
//           {menuItems[role].map((item) => {
//             const isActive = pathname === item.href;

//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`block px-3 py-2 rounded-lg ${
//                     isActive
//                       ? "bg-blue-600 text-white font-semibold"
//                       : "text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </aside>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// export default function Sidebar() {
//   const pathname = usePathname();

//   // Simple menu (no roles)
//   const menuItems = [
//     { href: "/dashboard", label: "Overview" },
//     { href: "/dashboard/users", label: "Manage Users" },
//     { href: "/dashboard/settings", label: "Settings" },
//   ];

//   return (
//     <aside className="w-64 bg-gray-100 p-4">
//       <h2 className="font-bold text-lg mb-4">Dashboard</h2>
//       <ul className="space-y-2">
//         {menuItems.map((item) => {
//           const isActive = pathname === item.href;

//           return (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 className={`block px-3 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-600 text-white font-semibold"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// }
