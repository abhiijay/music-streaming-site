import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, LogOut, Settings, Music, Headphones, Clock, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockUserData, mockListeningHistory } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [listeningHistory, setListeningHistory] = useState(mockListeningHistory);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedBio, setEditedBio] = useState(userData.bio);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUserData(mockUserData);
      setListeningHistory(mockListeningHistory);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = () => {
    setUserData({
      ...userData,
      name: editedName,
      bio: editedBio,
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, you would clear auth state and redirect
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Profile header */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 border-4 border-mq-orange">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="text-4xl">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 text-2xl font-bold"
                />
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 h-24"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>Save</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                    <div className="flex items-center gap-2 text-zinc-400 mb-4">
                      <Badge variant="outline" className="bg-mq-navy text-white">
                        {userData.plan}
                      </Badge>
                      <span>•</span>
                      <span>Member since {new Date(userData.joinDate).getFullYear()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
                
                <p className="text-zinc-300 mb-4">{userData.bio}</p>
                
                <div className="flex gap-6 text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Music className="h-4 w-4" />
                    <span>{userData.playlists} Playlists</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{userData.favorites} Favorites</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Headphones className="h-4 w-4" />
                    <span>{Number(userData.hoursListened).toFixed(1)} Hours Listened</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listening">Listening History</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Listening Stats</CardTitle>
                  <CardDescription>Your music activity over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Time</span>
                      <span className="font-bold">{Number(userData.stats.monthlyHours).toFixed(1)} hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tracks Played</span>
                      <span className="font-bold">{userData.stats.tracksPlayed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Artists Discovered</span>
                      <span className="font-bold">{userData.stats.artistsDiscovered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Most Active Day</span>
                      <span className="font-bold">{userData.stats.mostActiveDay}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Genres</CardTitle>
                  <CardDescription>Your most listened genres</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.topGenres.map((genre, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{genre.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-mq-orange rounded-full" 
                              style={{ width: `${genre.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm">{genre.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Top Artists</CardTitle>
                  <CardDescription>Artists you've listened to the most</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userData.topArtists.map((artist, index) => (
                      <div key={index} className="text-center">
                        <Avatar className="w-24 h-24 mx-auto mb-2">
                          <AvatarImage src={artist.image} alt={artist.name} />
                          <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{artist.name}</h3>
                        <p className="text-sm text-zinc-400">{Number(artist.hoursPlayed).toFixed(1)} hrs</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="listening">
            <Card>
              <CardHeader>
                <CardTitle>Recent Listening Activity</CardTitle>
                <CardDescription>Tracks you've listened to recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listeningHistory.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 hover:bg-mq-hover rounded-md transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={item.trackImage} alt={item.trackName} />
                        <AvatarFallback>{item.trackName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.trackName}</h3>
                        <p className="text-sm text-zinc-400">{item.artistName}</p>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{formatDistanceToNow(new Date(item.playedAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="playlists">
            <Card>
              <CardHeader>
                <CardTitle>Your Playlists</CardTitle>
                <CardDescription>Playlists you've created or saved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userData.playlists && Array.isArray(userData.playlists) ? (
                    userData.playlists.map((playlist, index) => (
                      <div key={index} className="text-center">
                        <div className="aspect-square bg-zinc-800 rounded-md mb-2 overflow-hidden">
                          <img 
                            src={playlist.image} 
                            alt={playlist.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-medium truncate">{playlist.name}</h3>
                        <p className="text-sm text-zinc-400">{playlist.trackCount} tracks</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 text-center py-8">
                      <p className="text-zinc-400">You haven't created any playlists yet.</p>
                      <Button className="mt-4">Create Playlist</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Subscription Plan</h3>
                      <p className="text-sm text-zinc-400">
                        You are currently on the {userData.plan} plan
                      </p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-zinc-400">
                        Receive updates about new releases and features
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="email-notifications" 
                        className="mr-2 h-4 w-4"
                        defaultChecked={userData.settings?.emailNotifications}
                      />
                      <label htmlFor="email-notifications">Enabled</label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Privacy Settings</h3>
                      <p className="text-sm text-zinc-400">
                        Manage who can see your listening activity
                      </p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Connected Services</h3>
                      <p className="text-sm text-zinc-400">
                        Manage connections to other platforms
                      </p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-red-500">Delete Account</h3>
                      <p className="text-sm text-zinc-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
