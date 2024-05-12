import {config} from 'dotenv';

config({
    debug: false
});

// 4 minutes timeout for data generation
export const getLongRunningTimeout = () => 5 * 60 * 1000;

export const getProjectName = (): string => process.env.PROJECT_NAME ?? '';

export const getBasePath = (): string => `${process.env.BASE_URL ?? ''}/api`;

export const addConfigToFetch = () => ({
    headers: {
        // Need to be replaced
        Authorization: `Bearer ${process.env.API_KEY ?? ''}`,
    }
});