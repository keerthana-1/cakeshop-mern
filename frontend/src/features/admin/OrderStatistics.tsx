import { useEffect, useState } from "react";
import { getOrderStatistics } from "../../services/apiOrder";

interface statType{
    totalOrders:number
    totalRevenue:number
    mostOrderedCake:string
    ordersToday:number
    uniqueCustomers:number
    peakOrderingTime:string
}

export default function OrderStatistics() {
  const [stats, setStats] = useState<statType|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getOrderStatistics();
        setStats(data);
      } catch (err) {
        console.error("Error fetching order statistics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No statistics available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Statistics</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p>${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Most Ordered Cake</h2>
          <p>{stats.mostOrderedCake}</p>
        </div>
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Orders Today</h2>
          <p>{stats.ordersToday}</p>
        </div>
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Unique Customers</h2>
          <p>{stats.uniqueCustomers}</p>
        </div>
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Peak Ordering Time</h2>
          <p>{stats.peakOrderingTime}:00</p>
        </div>
      </div>
    </div>
  );
}
