import { FC } from 'react';

interface OwnProps {}

const Player: FC<OwnProps> = () => {
  return (
    <div className="h-[70px] w-full max-w-[350px] md:h-[80px] md:max-w-[450px] lg:h-[90px] lg:max-w-[550px] xl:h-[100px] xl:max-w-[650px] 2xl:h-[120px] 2xl:max-w-[750px] overflow-hidden">
      <iframe
        src={'https://player.fireside.fm/v2/7d8ZfYhp/latest?theme=dark'}
        className="m-0 origin-top-left scale-[0.30] p-0 md:scale-[0.40] lg:scale-[0.45] xl:scale-[0.5] 2xl:scale-[0.65]"
        width="740"
        height="200"
      ></iframe>
    </div>
  );
};

export default Player;
