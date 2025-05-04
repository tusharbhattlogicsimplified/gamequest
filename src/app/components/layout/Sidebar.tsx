import Link from "next/link";
import IMAGES from "@/utils/imagePaths";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import CustomImage from "../ui/CustomImage";

const navItems = [
  { href: "/home", icon: "/SidebarIcons/home.svg", label: "Home" },
  { href: "/products", icon: "/SidebarIcons/gameStore.svg", label: "Store" },
  {
    href: "/dashboard",
    icon: "/SidebarIcons/appstore.svg",
    label: "Dashboard",
  },
  {
    href: "/leaderboard",
    icon: "/SidebarIcons/leaderboard.svg",
    label: "Leaderboard",
  },
];
const bottomItems = [
  { href: "/settings", icon: "/SidebarIcons/settings.svg", label: "Settings" },
  { href: "/logout", icon: "/SidebarIcons/logout.svg", label: "Logout" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({}: SidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <aside className="border-r border-neutral-800  flex-col h-full flex ">
      <div className="flex group hover:w-52 transition-all duration-300 w-24 bg-[#120c00] justify-center border-r border-neutral-600 hover:border-0 h-screen py-7">
        <div className="flex flex-col w-24 group-hover:w-52 overflow-hidden items-center group-hover:items-start transition-all duration-300 gap-y-5 will-change-scroll">
          <div className="flex flex-col items-center px-5 py-4">
            <Link
              href="/home"
              className="hover:text-gray-400 font-standout text-[#DAB785]"
            >
              <h2 className="">
                <span className="inline group-hover:hidden text-3xl">GQ</span>
                <span className="hidden group-hover:inline text-xl">GameQuest</span>
              </h2>
            </Link>
          </div>

          <div className="pb-4 flex flex-col border-b border-neutral-800">
            {navItems.map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white transition"
                title={label}
              >
                <CustomImage src={icon} alt={label} width={20} height={20} />
                <span className="hidden group-hover:inline text-sm">
                  {label || "xyzabc"}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col  items-center group-hover:items-start transition-all duration-300 gap-4 px-4 py-8 w-full">
            {bottomItems.map(({ href, icon, label }) => {
              const isLogout = href === "/logout";

              const handleClick = (e: React.MouseEvent) => {
                if (isLogout) {
                  e.preventDefault();
                  dispatch(logout());
                  router.push("/login");
                }
              };

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={handleClick}
                  className="flex  gap-3 text-gray-400 hover:text-white transition"
                  title={label}
                >
                  <CustomImage src={icon} alt={label} width={20} height={20} />
                  <span className="hidden group-hover:inline text-sm">
                    {label || "xyzabc"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
