import { FC, ReactNode } from 'react';

interface OwnProps {
  title: string;
  data: number | string | ReactNode;
  className?: string;
  titleClassName?: string;
  dataClassName?: string;
  addLineData?: string;
  addLineClassName?: string;
}

const ProjectCard: FC<OwnProps> = ({ title, data, className = '', titleClassName = '', dataClassName = '' }) => {
  return (
    <div
      className={`${className}     
       mx-1 flex flex-col items-center rounded-xl bg-paper
      xs:w-[100px]
      sm:w-[130px]
      md:w-[150px] 
      lg:w-[180px] 
      xl:w-[200px] 
      2xl:w-[260px]`}
    >
      <div className={`${dataClassName} text-xl font-light`}>{data}</div>
      <div className={`${titleClassName} text-sm font-normal`}>{title}</div>
    </div>
  );
};

export default ProjectCard;
