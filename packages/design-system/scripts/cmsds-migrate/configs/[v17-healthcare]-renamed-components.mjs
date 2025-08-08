export default {
  description:
    'Flags usage of "AccordionItem" and "ThirdPartyExternalLink" that have Healthcare.gov-specific overrides\n that require renaming in version 17 of `ds-healthcare-gov`',
  patterns: ['**/*'],
  globbyConfig: {
    ignore: ['**/cmsds-migrate/**/*'],
  },
  expressions: [
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!\w|HealthcaregovAccordionItem\sas\s)(AccordionItem)(?!\sas)([\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-healthcare-gov['"])/,
        'gi'
      ),
      to: '$1HealthcaregovAccordionItem as AccordionItem$3 /* CMSDS-MIGRATE: `AccordionItem` was renamed `HealthcaregovAccordionItem` in ds-healthcare-gov v17 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!Healthcaregov)(AccordionItem)(\s+as\s+(?=\w+)[\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-healthcare-gov['"])/,
        'gi'
      ),
      to: '$1HealthcaregovAccordionItem$3 /* CMSDS-MIGRATE: `AccordionItem` was renamed `HealthcaregovAccordionItem` in ds-healthcare-gov v17 */',
    },
        {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!\w|HealthcaregovThirdPartyExternalLink\sas\s)(ThirdPartyExternalLink)(?!\sas)([\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-healthcare-gov['"])/,
        'gi'
      ),
      to: '$1HealthcaregovThirdPartyExternalLink as ThirdPartyExternalLink$3 /* CMSDS-MIGRATE: `ThirdPartyExternalLink` was renamed `HealthcaregovThirdPartyExternalLink` in ds-healthcare-gov v17 */',
    },
    {
      from: new RegExp(
        /(import[\s\S]*?{[\s\S]*?)(?<!Healthcaregov)(ThirdPartyExternalLink)(\s+as\s+(?=\w+)[\s\S]*?}[\s\S]*?from[\s\S]*?['"]@cmsgov\/ds-healthcare-gov['"])/,
        'gi'
      ),
      to: '$1HealthcaregovThirdPartyExternalLink$3 /* CMSDS-MIGRATE: `ThirdPartyExternalLink` was renamed `HealthcaregovThirdPartyExternalLink` in ds-healthcare-gov v17 */',
    }
  ],
};
