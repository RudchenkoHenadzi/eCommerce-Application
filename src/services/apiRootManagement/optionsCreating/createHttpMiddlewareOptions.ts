import PROJECT_CONFIG from '@/constants/projectConfigs';
const { apiURL } = PROJECT_CONFIG;

export default function createHttpMiddlewareOptions() {
  return {
    host: apiURL,
    fetch
  };
}
