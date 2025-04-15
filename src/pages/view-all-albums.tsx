
import Layout from "@/components/layout";
import { CollectionGrid } from "@/components/collection-grid";
import { useState, useEffect } from "react";

const ViewAllAlbums = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [albums, setAlbums] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlbums([
        {
          id: "1",
          title: "People's Instinctive...",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          description: "A Tribe Called Quest",
          tracksCount: 14
        },
        {
          id: "2",
          title: "SABLE TABLE",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          description: "Bon Iver",
          tracksCount: 10
        },
        {
          id: "3",
          title: "Album of the Year...",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          description: "Boesey Collins",
          tracksCount: 8
        },
        {
          id: "4",
          title: "...And What Was Left?",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          description: "Muscadine Bloodline",
          tracksCount: 12
        },
        // Add more albums for the grid view
        {
          id: "5",
          title: "Blue Note Sessions",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          description: "Robert Glasper",
          tracksCount: 9
        },
        {
          id: "6",
          title: "Midnight Groove",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          description: "Laura Del Rey",
          tracksCount: 11
        },
        {
          id: "7",
          title: "Acoustic Dreams",
          imageUrl: "/lovable-uploads/81d39118-ff63-460e-993d-275178cd6c40.png",
          description: "John Mayer",
          tracksCount: 8
        },
        {
          id: "8",
          title: "Electronic Visions",
          imageUrl: "/lovable-uploads/a910c028-5947-4358-b83a-240ed8a516ca.png",
          description: "Bonobo",
          tracksCount: 10
        },
        {
          id: "9",
          title: "Soul Sessions",
          imageUrl: "/lovable-uploads/86fe2794-e609-4196-8564-e55c1436ec48.png",
          description: "Anderson .Paak",
          tracksCount: 12
        },
        {
          id: "10",
          title: "Harmonic Theory",
          imageUrl: "/lovable-uploads/00e244a7-d659-4312-befb-52b043a87ce6.png",
          description: "Jacob Collier",
          tracksCount: 14
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout>
      <CollectionGrid 
        title="All Albums" 
        items={albums} 
        type="albums"
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default ViewAllAlbums;
