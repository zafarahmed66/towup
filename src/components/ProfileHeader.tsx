type Props = {
  image?: string;
  name?: string;
  companyName: string;
};
const ProfileHeader = ({ image, companyName, name }: Props) => {
  return (
    <div className="bg-gradient-to-r from-[#3b5998] to-[#2B4380] p-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <div className="relative cursor-pointer group">
          <input type="file" className="hidden" accept="image/*" />
          <div className="p-1 bg-white rounded-full shadow-md">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="object-cover w-24 h-24 rounded-full"
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-3xl font-bold">
                {companyName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{companyName}</h2>
          {name && <p className="text-white text-lg">{name}</p>}
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
