import { useNavigateBack } from '@/hooks/navigate-back';
import useRemoteController from './remote-controller';

export default function useGlobalBackListener() {
  const { navigateBack } = useNavigateBack();

  useRemoteController({
    listenTo: {
      back() {
        navigateBack();
      },
    },
  });
}
