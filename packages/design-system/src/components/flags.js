// featureFlags.js
const flags = {
  ERROR_PLACEMENT_DEFAULT: 'top',
};

export function errorPlacementDefault() {
  return flags.ERROR_PLACEMENT_DEFAULT;
}

export function setErrorPlacementDefault(value) {
  flags.ERROR_PLACEMENT_DEFAULT = value;
}
