import Link from "next/link";
import Image from "next/image";
import IMAGES from "@/utils/imagePaths";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/app/store/authSlice";

const navItems = [
  { href: "/", icon: "/sidebarIcons/home.svg", label: "Home" },
  {
    href: "/inbox",
    icon: "/sidebarIcons/messages.svg",
    label: "Inbox",
    notification: true,
  },
  { href: "/store", icon: "/sidebarIcons/gameStore.svg", label: "Store" },
  { href: "/billing", icon: "/sidebarIcons/payment.svg", label: "Billing" },
  {
    href: "/dashboard",
    icon: "/sidebarIcons/appstore.svg",
    label: "Dashboard",
  },
  {
    href: "/leaderboard",
    icon: "/sidebarIcons/leaderboard.svg",
    label: "Leaderboard",
  },
];
const bottomItems = [
  { href: "/settings", icon: "/sidebarIcons/settings.svg", label: "Settings" },
  { href: "/logout", icon: "/sidebarIcons/logout.svg", label: "Logout" },
];

interface SidebarProps  {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ }: SidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <aside className="border-r border-neutral-800  flex-col py-11 h-full flex">
      <div className="flex group hover:w-52 transition-all duration-300 w-24 bg-amber-900 justify-center">
        <div className="flex flex-col justify-between w-24 group-hover:w-52 overflow-hidden items-center group-hover:items-start transition-all duration-300">
          <div className="flex flex-col items-center px-5 py-4">
            <Image
              src={IMAGES.gameQuestLogo.src}
              alt={IMAGES.gameQuestLogo.alt}
              width={50}
              height={20}
            />
          </div>

          <div className="pb-4 flex flex-col border-b border-neutral-800">
            {navItems.map(({ href, icon, label, notification }) => (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white transition"
                title={label}
              >
                <Image src={icon} alt={label} width={20} height={20} />
                <span className="hidden group-hover:inline text-sm">
                  {label || "xyzabc"}
                </span>
                {notification && (
                  <span className="absolute top-2 left-7 w-2 h-2 bg-red-500 rounded-full" />
                )}
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
                  <Image src={icon} alt={label} width={20} height={20} />
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
