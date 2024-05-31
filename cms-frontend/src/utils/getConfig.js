import getNextConfig from 'next/config';
import objectPath from 'object-path';

export const getConfig = (key, defaultValue) => {
    const { publicRuntimeConfig, serverRuntimeConfig } = getNextConfig() || {}

    return objectPath.get({
        server: serverRuntimeConfig,
        public: publicRuntimeConfig
    }, key, defaultValue)
}