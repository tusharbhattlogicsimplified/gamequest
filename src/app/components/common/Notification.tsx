import React from "react";

type NotificationAction = {
  label: string;
  style: string;
};

type NotificationData = {
  id: number;
  image: string;
  title: string;
  message: string;
  actions: NotificationAction[];
};

const notifications: NotificationData[] = [
  {
    id: 1,
    image: "https://picsum.photos/200",
    title: "Friend Request",
    message: "@noob_cityhunter sent you a friend request.",
    actions: [
      { label: "Accept", style: "bg-white text-black" },
      { label: "Decline", style: "bg-white/10 text-secondary-text" },
    ],
  },
  {
    id: 2,
    image: "https://picsum.photos/300",
    title: "Game Started",
    message: "You have received 2000 VC from @cityhunter.",
    actions: [],
  },
];

interface NotificationItemProps {
  image: string;
  title: string;
  message: string;
  actions?: NotificationAction[];
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  image,
  title,
  message,
  actions = [],
}) => (
  <div className="relative bg-black/40 rounded-3xl">
    <div className="relative bg-secondary-bg rounded-3xl px-3 py-3 flex flex-row">
      <div className="relative mr-2">
        <div className="absolute inset-0 w-16 rounded-3xl mr-3 aspect-square blur-[0.4em]">
          <img src={image} className="object-cover rounded-3xl" />
        </div>
        <div className="relative w-16 rounded-3xl mr-3 aspect-square">
          <img src={image} className="object-cover rounded-3xl" />
        </div>
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold mb-1 text-white">{title}</p>
        <p className="text-xs text-white/70">{message}</p>
        {actions.length > 0 && (
          <div className="mt-3 flex flex-row gap-2">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className={`px-3 py-1.5 rounded-3xl text-xs font-medium ${action.style}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

interface NotificationProps {
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
}

const Notification: React.FC<NotificationProps> = ({
  showNotification,
  setShowNotification,
}) => {
  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    showNotification && (
      <div className="flex flex-col gap-y-4 bg-amber-950 md:static md:w-[500px] fixed top-0 left-0 w-full h-full z-50 overflow-y-auto px-6 py-6">
        <span
          className="absolute top-4 right-4 text-white cursor-pointer block md:hidden"
          onClick={handleClose}
        >
          &times;
        </span>

        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            image={notif.image}
            title={notif.title}
            message={notif.message}
            actions={notif.actions}
          />
        ))}
      </div>
    )
  );
};

export default Notification;
