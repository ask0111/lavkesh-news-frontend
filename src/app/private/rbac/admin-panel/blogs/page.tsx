
export default function ManageBlogs() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Category</th>
              <th className="p-2 border-b">Published Date</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td className="p-2 border-b">Sample Blog Title</td>
              <td className="p-2 border-b">Technology</td>
              <td className="p-2 border-b">2024-11-05</td>
              <td className="p-2 border-b">
                <button className="text-blue-500 mr-2">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
