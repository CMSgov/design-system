// flags.js

export function errorPlacementDefault() {
  const flags = JSON.parse(process.env.CMSDS_FLAGS);
  return flags.ERROR_PLACEMENT_DEFAULT;
}
