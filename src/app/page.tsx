import { FC } from 'react';

import Subtitle from '@/app/components/common/subtitle';
import ProjectCards from '@/app/components/main-page/project-cards';

type PageProps = { searchParams: Record<string, string | string[] | undefined> };

const MainPage: FC<PageProps> = async ({ searchParams }) => {
  return (
    <div>
      <Subtitle text={'Tools, Projects and Public Goods'} />
      <ProjectCards />
    </div>
  );
};

export default MainPage;
