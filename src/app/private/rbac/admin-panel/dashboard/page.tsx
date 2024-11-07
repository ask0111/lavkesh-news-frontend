
export default function Dashboard({ params = { admin: "default-value" } }: { params: { admin: string } }) {
    
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Blogs</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">120</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">New Comments</h2>
          <p className="text-3xl font-bold">45</p>
        </div>
      </div>
    </div>
  );
}
