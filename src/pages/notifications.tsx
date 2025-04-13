
import Layout from "@/components/layout";
import { useState } from "react";
import { Bell, Music, User, ShoppingBag } from "lucide-react";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "new_album",
      title: "New album available",
      message: "Drake just released a new album 'For All The Dogs'",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "playlist",
      title: "Playlist updated",
      message: "TIDAL's Top Hits playlist has been updated with 15 new songs",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "subscription",
      title: "Subscription renewal",
      message: "Your TIDAL HiFi subscription will renew in 3 days",
      time: "2 days ago",
      read: true,
    },
    {
      id: 4,
      type: "artist",
      title: "Artist you follow has new content",
      message: "Quavo released a new single 'Legends'",
      time: "4 days ago",
      read: true,
    },
    {
      id: 5,
      type: "playlist",
      title: "Added to playlist",
      message: "You added 3 songs to your 'Favorites' playlist",
      time: "1 week ago",
      read: true,
    }
  ]);

  const getIcon = (type: string) => {
    switch(type) {
      case "new_album":
        return <Music className="h-5 w-5 text-tidal-blue" />;
      case "playlist":
        return <Music className="h-5 w-5 text-purple-500" />;
      case "artist":
        return <User className="h-5 w-5 text-green-500" />;
      case "subscription":
        return <ShoppingBag className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-zinc-400" />;
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Notifications</h1>
        <p className="text-zinc-400">
          Stay updated with new releases, playlists updates and more.
        </p>
      </div>

      <div className="space-y-3 max-w-3xl">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg border ${
                notification.read 
                  ? 'bg-zinc-900 border-zinc-800' 
                  : 'bg-zinc-800/80 border-zinc-700'
              }`}
            >
              <div className="flex items-start">
                <div className="rounded-full bg-zinc-800 p-2 mr-4">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${notification.read ? 'text-white' : 'text-white font-semibold'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <span className="h-2 w-2 bg-tidal-blue rounded-full"></span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-zinc-400">
            <Bell className="h-12 w-12 mx-auto mb-4 text-zinc-600" />
            <h2 className="text-lg font-medium mb-2">No notifications</h2>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications;
