import { useHomePage } from '@/hooks';
import { Grid } from '@/components/layout/grid';
import { Loader } from '@/components/common/loader';
import { Filters } from '@/components/layout/filters';
import useGlobalBackListener from '@/hooks/global-back-listener';

export const HomePage = () => {
  useGlobalBackListener();

  const { isLoading, movies } = useHomePage();

  return isLoading ? <Loader /> : (
      <div className="container mx-auto px-4" id='scroll'>
        <Filters />
        <Grid items={movies}  />
      </div>
    );
};
