import { GetLocalVariablesResponse } from '@figma/rest-api-spec';

const response: GetLocalVariablesResponse = {
  status: 200,
  error: false,
  meta: {
    variableCollections: {
      'VariableCollectionId:111': {
        id: 'VariableCollectionId:111',
        name: 'System',
        modes: [{ modeId: 'ModeId:1', name: 'Value' }],
        defaultModeId: 'ModeId:1',
        remote: false,
        key: 'variableKey',
        hiddenFromPublishing: false,
        variableIds: [
          'aaa111',
          'oce050',
          'oce100',
          'oce200',
          'oce300',
          'oce400',
          'oce500',
          'rad804',
          'rad805',
          'rad806',
          'rad807',
          'rad808',
          'rad809',
          'spa001',
        ],
      },
      'VariableCollectionId:222': {
        id: 'VariableCollectionId:222',
        name: 'Theme',
        modes: [
          { modeId: 'ModeId:21', name: 'core' },
          { modeId: 'ModeId:22', name: 'cmsgov' },
        ],
        defaultModeId: 'ModeId:21',
        remote: false,
        key: 'variableKey',
        hiddenFromPublishing: false,
        variableIds: ['but100', 'pri300', 'pri500', 'ale001', 'ale002'],
      },
    },
    variables: {
      aaa111: {
        id: 'aaa111',
        name: 'color/transparent',
        key: 'color/transparent',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': { r: 1, g: 1, b: 1, a: 0 },
        },
        remote: false,
        description: '',
        hiddenFromPublishing: false,
        scopes: ['ALL_SCOPES'],
        codeSyntax: {},
      },
      oce050: {
        id: 'oce050',
        name: 'color/ocean/50',
        key: 'color/ocean/50',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0.9019607901573181,
            g: 0.9450980424880981,
            b: 0.9725490212440491,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      oce100: {
        id: 'oce100',
        name: 'color/ocean/100',
        key: 'color/ocean/100',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0.7019608020782471,
            g: 0.8313725590705872,
            b: 0.9215686321258545,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      oce200: {
        id: 'oce200',
        name: 'color/ocean/200',
        key: 'color/ocean/200',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0.501960813999176,
            g: 0.7215686440467834,
            b: 0.8705882430076599,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      oce300: {
        id: 'oce300',
        name: 'color/ocean/300',
        key: 'color/ocean/300',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0.3019607961177826,
            g: 0.6117647290229797,
            b: 0.8156862854957581,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      oce400: {
        id: 'oce400',
        name: 'color/ocean/400',
        key: 'color/ocean/400',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0.10196078568696976,
            g: 0.49803921580314636,
            b: 0.7647058963775635,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      oce500: {
        id: 'oce500',
        name: 'color/ocean/500',
        key: 'color/ocean/500',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:111',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:1': {
            r: 0,
            g: 0.4431372582912445,
            b: 0.7372549176216125,
            a: 1,
          },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad804: {
        id: 'rad804',
        name: 'radius/circle',
        key: 'radius/circle',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 100 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad805: {
        id: 'rad805',
        name: 'radius/default',
        key: 'radius/default',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 3 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad806: {
        id: 'rad806',
        name: 'radius/large',
        key: 'radius/large',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 8 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad807: {
        id: 'rad807',
        name: 'radius/medium',
        key: 'radius/medium',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 4 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad808: {
        id: 'rad808',
        name: 'radius/pill',
        key: 'radius/pill',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 9999 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      rad809: {
        id: 'rad809',
        name: 'radius/small',
        key: 'radius/small',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 2 },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      but100: {
        id: 'but100',
        name: 'component/button/border-radius',
        key: 'component/button/border-radius',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:222',
        resolvedType: 'FLOAT',
        valuesByMode: {
          'ModeId:21': { type: 'VARIABLE_ALIAS', id: 'rad809' },
          'ModeId:22': { type: 'VARIABLE_ALIAS', id: 'rad809' },
        },
        scopes: ['CORNER_RADIUS'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      pri300: {
        id: 'pri300',
        name: 'theme/color/primary-light',
        key: 'theme/color/primary-light',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:222',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:21': { type: 'VARIABLE_ALIAS', id: 'oce300' },
          'ModeId:22': { type: 'VARIABLE_ALIAS', id: 'oce050' },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      pri500: {
        id: 'pri500',
        name: 'theme/color/primary',
        key: 'theme/color/primary',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:222',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:21': { type: 'VARIABLE_ALIAS', id: 'oce500' },
          'ModeId:22': { type: 'VARIABLE_ALIAS', id: 'oce100' },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      ale001: {
        id: 'ale001',
        name: 'component/alert/background-color',
        key: 'component/alert/background-color',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:222',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:21': { type: 'VARIABLE_ALIAS', id: 'pri300' },
          'ModeId:22': { type: 'VARIABLE_ALIAS', id: 'pri300' },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      ale002: {
        id: 'ale002',
        name: 'component/alert/border-color',
        key: 'component/alert/border-color',
        remote: false,
        description: '',
        variableCollectionId: 'VariableCollectionId:222',
        resolvedType: 'COLOR',
        valuesByMode: {
          'ModeId:21': { type: 'VARIABLE_ALIAS', id: 'pri500' },
          'ModeId:22': { type: 'VARIABLE_ALIAS', id: 'pri500' },
        },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
      spa001: {
        id: 'spa001',
        name: 'spacer/1',
        key: 'spacer/1',
        remote: false,
        description: '',
        resolvedType: 'FLOAT',
        variableCollectionId: 'VariableCollectionId:111',
        valuesByMode: { 'ModeId:1': 8 },
        scopes: ['ALL_SCOPES'],
        hiddenFromPublishing: false,
        codeSyntax: {},
      },
    },
  },
};

export default response;

export const emptyResponse: GetLocalVariablesResponse = {
  status: 200,
  error: false,
  meta: {
    variableCollections: {},
    variables: {},
  },
};
