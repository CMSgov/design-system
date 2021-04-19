type errorPlacementValue = 'top' | 'bottom';
interface flagsType {
  ERROR_PLACEMENT_DEFAULT: errorPlacementValue;
}

// featureFlags.js
const flags: flagsType = {
  ERROR_PLACEMENT_DEFAULT: 'top',
};

export function errorPlacementDefault(): errorPlacementValue {
  return flags.ERROR_PLACEMENT_DEFAULT;
}

export function setErrorPlacementDefault(value: errorPlacementValue): void {
  flags.ERROR_PLACEMENT_DEFAULT = value;
}
