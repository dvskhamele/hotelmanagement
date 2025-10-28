
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">User Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border rounded" value="Admin User" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded" value="admin@hotelops.com" />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="flex items-center mb-2">
            <input type="checkbox" id="emailNotifications" className="mr-2" defaultChecked />
            <label htmlFor="emailNotifications">Email Notifications</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="smsNotifications" className="mr-2" />
            <label htmlFor="smsNotifications">SMS Notifications</label>
          </div>
        </div>
      </div>
    </div>
  );
}
