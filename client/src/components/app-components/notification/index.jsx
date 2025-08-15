const Notification = ({ orderId, status }) => (
  <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md animate-fade-in">
    Order #{orderId} is now <span className="font-semibold">{status}</span>
  </div>
);

export default Notification;