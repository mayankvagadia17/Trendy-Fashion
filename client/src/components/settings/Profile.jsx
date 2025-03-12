import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold text-black">
            {localStorage.getItem("name")}
          </h3>
          <p className="text-black">{localStorage.getItem("email")}</p>
        </div>
      </div>
      {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button> */}
    </SettingSection>
  );
};
export default Profile;
