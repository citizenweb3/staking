const Player = () => {
  return (
    <div className="h-[40px] w-full md:h-[58px] lg:h-[66px] xl:h-[80px] 2xl:h-[130px]">
      <iframe
        src={'https://player.fireside.fm/v2/7d8ZfYhp/latest?theme=dark'}
        className="m-0 origin-top-left scale-[0.20] p-0 md:scale-[0.30] lg:scale-[0.37] xl:scale-[0.42] 2xl:scale-[0.65]"
        width="740"
        height="200"
      ></iframe>
    </div>
  );
};

export default Player;
