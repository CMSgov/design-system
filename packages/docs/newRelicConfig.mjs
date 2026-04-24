export default function generateNewRelicPlugin() {
  const NEW_RELIC_MODE = process.env.NEW_RELIC_MODE || 'off';

  const NEW_RELIC_BASE_CONFIG = {
    instrumentationType: 'proAndSPA',
    trustKey: '39033',
    licenseKey: 'NRJS-d12a0b7909b564e0959',
    beacon: 'gov-bam.nr-data.net',
    errorBeacon: 'gov-bam.nr-data.net',
  };

  const NEW_RELIC_CONFIG_BY_MODE = {
    dev: {
      ...NEW_RELIC_BASE_CONFIG,
      accountId: process.env.NEW_RELIC_ACCOUNT_ID_DEV,
      agentID: process.env.NEW_RELIC_AGENT_ID_DEV,
      applicationID: process.env.NEW_RELIC_AGENT_ID_DEV,
    },
    prod: {
      ...NEW_RELIC_BASE_CONFIG,
      accountId: process.env.NEW_RELIC_ACCOUNT_ID_PROD || '6704482',
      agentID: process.env.NEW_RELIC_AGENT_ID_PROD || '1134604697',
      applicationID: process.env.NEW_RELIC_AGENT_ID_PROD || '1134604697',
    },
  };

  if (!['off', 'dev', 'prod'].includes(NEW_RELIC_MODE)) {
    throw new Error(
      `Invalid NEW_RELIC_MODE: "${NEW_RELIC_MODE}". Expected "off", "dev", or "prod".`
    );
  }

  const newRelicPlugin =
    NEW_RELIC_MODE === 'off'
      ? null
      : {
          resolve: 'gatsby-plugin-newrelic',
          options: {
            // @ts-ignore
            config: NEW_RELIC_CONFIG_BY_MODE[NEW_RELIC_MODE],
          },
        };

  return newRelicPlugin;
}
