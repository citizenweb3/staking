import Image from 'next/image';

const Medals = async () => {
  return (
    <div className="flex space-x-16">
      <div title="Off the Grid Infrastructure" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/otgi.svg"
          alt={`off-the-grid infrastructure`}
          className="h-20 w-20"
        />
      </div>
      <div title="Keyhole" className="transition-all duration-150 hover:scale-105">
        <Image width={30} height={30} src="/icons/medals/keyhole.svg" alt={`keyhole`} className="h-20 w-20" />
      </div>
      <div title="Eco" className="transition-all duration-150 hover:scale-105">
        <Image width={30} height={30} src="/icons/medals/eco.svg" alt={`eco`} className="h-20 w-20" />
      </div>
      <div title="Github" className="transition-all duration-150 hover:scale-105">
        <Image width={30} height={30} src="/icons/medals/github.svg" alt={`github`} className="h-20 w-20" />
      </div>
      <div title="Off the Grid Infrastructure" className="transition-all duration-150 hover:scale-105">
        <Image
          width={30}
          height={30}
          src="/icons/medals/horcrux.svg"
          alt={`off-the-grid-infrastructure`}
          className="h-20 w-20"
        />
      </div>
    </div>
  );
};

export default Medals;
