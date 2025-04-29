import Link from "next/link";
import Image from "next/image";
import IMAGES from "@/utils/imagePaths";

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
  {
    href: "/settings",
    icon: "/sidebarIcons/leaderboard.svg",
    label: "Settings",
  },
  { href: "/logout", icon: "/sidebarIcons/leaderboard.svg", label: "Logout" },
];

export default function Sidebar() {
  return (
    <aside className="border-r border-neutral-800 flex flex-col py-11 h-full">
      <div className="flex flex-col items-center px-5">
        {/* Logo */}
        <Image
          src={IMAGES.gameQuestLogo.src}
          alt={IMAGES.gameQuestLogo.alt}
          width={50}
          height={20}
        />
      </div>
      <div className=" py-8 justify-center items-center flex flex-col border-b-1 border-neutral-800">
        {/* Top nav icons */}
        {navItems.map(({ href, icon, label, notification }) => (
          <Link
            key={href}
            href={href}
            className="relative flex items-center justify-center w-12 h-12 text-gray-300 hover:text-white transition"
            title={label}
          >
            <Image src={icon} alt={label} width={20} height={20} />
            {notification && (
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
        ))}
      </div>
      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-4 px-5 py-8">
        {bottomItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-white transition"
            title={label}
          >
            <Image src={icon} alt={label} width={20} height={20} />
          </Link>
        ))}
      </div>
    </aside>
  );
}
