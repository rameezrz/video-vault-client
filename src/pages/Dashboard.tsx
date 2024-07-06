import { useAuth } from "../context/AuthContext";
import AvatarUpload from "../components/AvatarUpload";

const Dashboard = () => {
  const { user } = useAuth();
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  return (
    <div className="flex-col mx-auto w-[70%] p-6 items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Dashboard</h2>
        {user && (
          <div>
            <p>
              <strong>Name:</strong>{" "}
              {`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Mobile:</strong> {user.mobile}
            </p>
          </div>
        )}
      </div>
      <div className="bg-white p-8 mt-20">
        <AvatarUpload />
      </div>
    </div>
  );
};

export default Dashboard;
