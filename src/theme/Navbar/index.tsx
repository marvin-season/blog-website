import Navbar from "@theme-original/Navbar";

// function Navbar() {
//     const { navbar } = useThemeConfig();
//     console.log(useThemeConfig());
//     return (
//         <div className="navbar bg-transparent px-2 py-1 mx-auto flex items-center gap-x-2 fixed inset-x-0 z-50">
//             {navbar.items.map((item) => {
//                 const to = item.to as string;
//                 return (
//                     <Link
//                         key={to}
//                         to={to}
//                         className={
//                             "cursor-pointer !text-black/30 hover:!text-black dark:!text-white/30 dark:hover:!text-white"
//                         }
//                     >
//                         {item.label}
//                     </Link>
//                 );
//             })}
//         </div>
//     );
// }

export default Navbar;
