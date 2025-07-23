export default {
  description:
    'Flags usage of "HelpDrawer", "HelpDrawerToggle", and "ThirdPartyExternalLink" that have\nMedicare.gov-specific overrides that\nrequire renaming in version 15 of `ds-medicare-gov`',
  patterns: ['**/*'],
  globbyConfig: {
    ignore: ['**/cmsds-migrate/**/*'],
  },
  expressions: [
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!\w|MedicaregovHelpDrawer\sas\s)(HelpDrawer)(?!\sas)([\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovHelpDrawer as HelpDrawer$3 /* CMSDS-MIGRATE: `HelpDrawer` was renamed `MedicaregovHelpDrawer` in ds-medicare-gov v15 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!Medicaregov)(HelpDrawer)(\s+as\s+(?=\w+)[\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovHelpDrawer$3 /* CMSDS-MIGRATE: `HelpDrawer` was renamed `MedicaregovHelpDrawer` in ds-medicare-gov v15 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!\w|MedicaregovHelpDrawerToggle\sas\s)(HelpDrawerToggle)(?!\sas)([\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovHelpDrawerToggle as HelpDrawerToggle$3 /* CMSDS-MIGRATE: `HelpDrawerToggle` was renamed `MedicaregovHelpDrawerToggle` in ds-medicare-gov v15 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!Medicaregov)(HelpDrawerToggle)(\s+as\s+(?=\w+)[\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovHelpDrawerToggle$3 /* CMSDS-MIGRATE: `HelpDrawerToggle` was renamed `MedicaregovHelpDrawerToggle` in ds-medicare-gov v15 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!\w|MedicaregovThirdPartyExternalLink\sas\s)(ThirdPartyExternalLink)(?!\sas)([\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovThirdPartyExternalLink as ThirdPartyExternalLink$3 /* CMSDS-MIGRATE: `ThirdPartyExternalLink` was renamed `MedicaregovThirdPartyExternalLink` in ds-medicare-gov v15 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!Medicaregov)(ThirdPartyExternalLink)(\s+as\s+(?=\w+)[\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-medicare-gov['"])/,
        'gi'
      ),
      to: '$1MedicaregovThirdPartyExternalLink$3 /* CMSDS-MIGRATE: `ThirdPartyExternalLink` was renamed `MedicaregovThirdPartyExternalLink` in ds-medicare-gov v15 */',
    },
  ],
};
