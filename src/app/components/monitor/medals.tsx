import Image from 'next/image';

const Medals = async () => {
  return (
    <div className="flex space-x-12 lg:space-x-16">
      <div title="Off the Grid Infrastructure" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/otgi.svg"
          alt={`Off-the-grid Infrastructure`}
          className="h-16 w-16 lg:h-20 lg:w-20"
        />
      </div>
      <div title="Key Sharding via Horcrux" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/keyhole.svg"
          alt={`Key Sharding via Horcrux`}
          className="h-16 w-16 lg:h-20 lg:w-20" />
      </div>
      <div title="Green Energy" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/eco.svg"
          alt={`Green Energy`}
          className="h-16 w-16 lg:h-20 lg:w-20" />
      </div>
      <div title="Github" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/github.svg"
          alt={`Github`}
          className="h-16 w-16 lg:h-20 lg:w-20" />
      </div>
      <div title="Self-hosted Infrastructure" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/horcrux.svg"
          alt={`Self-hosted Infrastructure`}
          className="h-16 w-16 lg:h-20 lg:w-20" />
      </div>
    </div>
  );
};

export default Medals;
