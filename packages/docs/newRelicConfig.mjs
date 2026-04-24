export default function generateNewRelicPlugin() {
    // Default to 'off' so we don't initialize New Relic at all on localhost
  const NEW_RELIC_MODE = process.env.NEW_RELIC_MODE || 'off';

  const NEW_RELIC_CONFIG = {
    instrumentationType: 'proAndSPA',
    trustKey: '39033',
    beacon: 'gov-bam.nr-data.net',
    errorBeacon: 'gov-bam.nr-data.net',
    // These values change between the Dev and Prod instances of New Relic.
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
    accountId: process.env.NEW_RELIC_ACCOUNT_ID,
    agentID: process.env.NEW_RELIC_AGENT_ID,
    // Application ID and Agent ID appear to be the same on the New Relic side.
    applicationID: process.env.NEW_RELIC_AGENT_ID,
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
            config: NEW_RELIC_CONFIG,
          },
        };

  return newRelicPlugin;
}
