import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaCoins, FaUserTag, FaCamera } from "react-icons/fa";
import axiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loader/Loading";
import { useAuth } from "../../../context/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // DB theke user info fetch
  const { data: profileUser, isLoading } = useQuery({
    queryKey: ["profileUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (profileUser) {
      setName(profileUser.name || "");
      setImagePreview(profileUser.photo || "");
    }
  }, [profileUser]);

  // Image select preview logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Profile Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.patch(
        `/users/update-profile/${user?.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setSuccessMsg("Profile updated successfully!");
        setErrorMsg("");
        
        // Query invalidate & instant navbar sync event
        queryClient.invalidateQueries(["profileUser", user?.email]);
        queryClient.invalidateQueries(["dbUser", user?.email]);
        window.dispatchEvent(new Event("profileUpdated"));
      }
    },
    onError: (err) => {
      console.error(err);
      setErrorMsg("Failed to update profile!");
      setSuccessMsg("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("name", name);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    updateMutation.mutate(formData);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-w-3xl mx-auto my-4 sm:my-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        
        {/* Responsive Unsplash Banner */}
        <div 
          className="h-36 sm:h-48 bg-cover bg-center relative flex items-end justify-center pb-4"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80')`
          }}
        >
        </div>

        <div className="p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            {/* Profile Image & Preview Floating Over Banner */}
            <div className="flex flex-col items-center -mt-16 sm:-mt-20 mb-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 group">
                <img
                  src={imagePreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg bg-white dark:bg-gray-800"
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 sm:p-3 rounded-full cursor-pointer shadow-lg transition transform hover:scale-105"
                  title="Change Photo"
                >
                  <FaCamera size={14} className="sm:w-4 sm:h-4" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">Click camera icon to change avatar</p>
            </div>

            {/* Messages */}
            {successMsg && (
              <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-xl text-center text-sm sm:text-base font-medium shadow-sm">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-center text-sm sm:text-base font-medium shadow-sm">
                {errorMsg}
              </div>
            )}

            {/* User Stats/Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-indigo-50/50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-indigo-100 dark:border-gray-700">
              <div className="flex items-center gap-3.5 bg-white dark:bg-gray-800 p-3 sm:p-3.5 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
                <div className="p-2 sm:p-2.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <FaUserTag size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Role</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200 capitalize text-sm sm:text-base">{profileUser?.role || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 bg-white dark:bg-gray-800 p-3 sm:p-3.5 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
                <div className="p-2 sm:p-2.5 bg-yellow-100 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400 rounded-lg">
                  <FaCoins size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Coins</p>
                  <p className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{profileUser?.coin ?? 0}</p>
                </div>
              </div>
            </div>

            {/* Name Input Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaUser className="text-indigo-600 dark:text-indigo-400" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-gray-50/50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base"
                placeholder="Enter your name"
              />
            </div>

            {/* Read-only Email Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-indigo-600 dark:text-indigo-400" /> Email Address
              </label>
              <input
                type="email"
                value={profileUser?.email || ""}
                disabled
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-100 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 cursor-not-allowed font-medium text-sm sm:text-base"
              />
            </div>

            {/* Save Changes Button */}
            <button
              type="submit"
              disabled={updateMutation.isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-200 dark:shadow-none disabled:bg-indigo-300 dark:disabled:bg-indigo-900 cursor-pointer text-sm sm:text-base"
            >
              {updateMutation.isLoading ? "Updating Profile..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;