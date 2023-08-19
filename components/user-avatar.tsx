import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";

function UserAvatar() {
  const { user } = useUser();
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  );
}

export default UserAvatar;
