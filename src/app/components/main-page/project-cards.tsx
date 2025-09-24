import ProjectCard from '@/app/components/common/metrics-card';

const ProjectCards = async () => {
  return (
    <div className="mt-8 flex w-full flex-row justify-center gap-6">
      <ProjectCard title={'Amount of Networks'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
      <ProjectCard title={'Total Rewards Paid'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
      <ProjectCard title={'Daily Revenue'} data={'345'} className={'py-5'} dataClassName={'mb-4'} />
    </div>
  );
};

export default ProjectCards;
