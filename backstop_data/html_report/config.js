report({
  testSuite: 'BackstopJS',
  tests: [
    {
      pair: {
        reference:
          '../bitmaps_reference/backstop_default_CMSDS_0_document_0_phone.png',
        test:
          '../bitmaps_test/20190709-095645/backstop_default_CMSDS_0_document_0_phone.png',
        selector: 'document',
        fileName: 'backstop_default_CMSDS_0_document_0_phone.png',
        label: 'CMSDS',
        requireSameDimensions: true,
        misMatchThreshold: 0.1,
        url: 'https://design.cms.gov',
        referenceUrl: '',
        expect: 0,
        viewportLabel: 'phone',
        error:
          'Reference file not found /Users/sophia/Desktop/cms/design-system/backstop_data/bitmaps_reference/backstop_default_CMSDS_0_document_0_phone.png'
      },
      status: 'fail'
    },
    {
      pair: {
        reference:
          '../bitmaps_reference/backstop_default_CMSDS_0_document_1_tablet.png',
        test:
          '../bitmaps_test/20190709-095645/backstop_default_CMSDS_0_document_1_tablet.png',
        selector: 'document',
        fileName: 'backstop_default_CMSDS_0_document_1_tablet.png',
        label: 'CMSDS',
        requireSameDimensions: true,
        misMatchThreshold: 0.1,
        url: 'https://design.cms.gov',
        referenceUrl: '',
        expect: 0,
        viewportLabel: 'tablet',
        error:
          'Reference file not found /Users/sophia/Desktop/cms/design-system/backstop_data/bitmaps_reference/backstop_default_CMSDS_0_document_1_tablet.png'
      },
      status: 'fail'
    }
  ],
  id: 'backstop_default'
});
