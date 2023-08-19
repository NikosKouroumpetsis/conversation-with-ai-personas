import { Avatar, AvatarImage } from "./ui/avatar";

interface BotAvatarProps {
  src: string;
}

function BotAvatar({ src }: BotAvatarProps) {
  return (
    <Avatar className="h-10 w-10">
      <AvatarImage src={src} />
    </Avatar>
  );
}

export default BotAvatar;
