type EnvSchema = {
    API_URL: string,
    ENABLE_API_MOCKING: string // should be true or false
    APP_URL?: string
    APP_MOCK_API_PORT?: string
}

const createEnv = () => {

    const envVars: any = Object.entries(import.meta.env).reduce<
        Record<string, string>
    >((acc, curr) => {
        const [key, value] = curr;
        if (key.startsWith('VITE_APP_')) {
            acc[key.replace('VITE_APP_', '')] = value;
        }
        return acc;
    }, {});

    console.log('env vars ', envVars)
    const parsedEnv: EnvSchema = envVars
    console.log('parsed Env ', parsedEnv)

    return parsedEnv;
};

export const env = createEnv();