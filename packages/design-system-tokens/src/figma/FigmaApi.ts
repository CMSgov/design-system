import axios from 'axios';

export interface VariableMode {
  modeId: string;
  name: string;
}

export interface VariableModeChange {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  id?: string;
  name?: string;
  variableCollectionId: string;
}

export interface VariableCollection {
  id: string;
  name: string;
  modes: VariableMode[];
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing: boolean;
}

export interface VariableCollectionChange
  extends Partial<Pick<VariableCollection, 'id' | 'name' | 'hiddenFromPublishing'>> {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  initialModeId?: string;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface VariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

export type VariableValue = boolean | number | string | Color | VariableAlias;

export type VariableScope = 'ALL_SCOPES' | VariableFloatScopes | VariableColorScopes;
type VariableFloatScopes = 'TEXT_CONTENT' | 'WIDTH_HEIGHT' | 'GAP';
type VariableColorScopes = 'ALL_FILLS' | 'FRAME_FILL' | 'SHAPE_FILL' | 'TEXT_FILL' | 'STROKE_COLOR';

export type VariableCodeSyntax = { WEB?: string; ANDROID?: string; iOS?: string };

export interface Variable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: { [modeId: string]: VariableValue };
  remote: boolean;
  description: string;
  hiddenFromPublishing: boolean;
  scopes: VariableScope[];
  codeSyntax: VariableCodeSyntax;
}

export interface VariableChange
  extends Partial<
    Pick<
      Variable,
      | 'id'
      | 'name'
      | 'variableCollectionId'
      | 'resolvedType'
      | 'description'
      | 'hiddenFromPublishing'
      | 'scopes'
      | 'codeSyntax'
    >
  > {
  action: 'CREATE' | 'UPDATE' | 'DELETE';
}

export interface VariableModeValue {
  variableId: string;
  modeId: string;
  value: VariableValue;
}

export interface ApiGetLocalVariablesResponse {
  status: number;
  error: boolean;
  meta: {
    variableCollections: { [id: string]: VariableCollection };
    variables: { [id: string]: Variable };
  };
}

export interface ApiPostVariablesPayload {
  variableCollections?: VariableCollectionChange[];
  variableModes?: VariableModeChange[];
  variables?: VariableChange[];
  variableModeValues?: VariableModeValue[];
}

interface ApiPostVariablesResponse {
  status: number;
  error: boolean;
  meta: { tempIdToRealId: { [tempId: string]: string } };
}

export default class FigmaApi {
  private baseUrl = 'https://api.figma.com';
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getLocalVariables(fileKey: string) {
    const resp = await axios.request<ApiGetLocalVariablesResponse>({
      url: `${this.baseUrl}/v1/files/${fileKey}/variables/local`,
      headers: {
        Accept: '*/*',
        'X-Figma-Token': this.token,
      },
    });

    return resp.data;
  }

  async postVariables(fileKey: string, payload: ApiPostVariablesPayload) {
    const resp = await axios.request<ApiPostVariablesResponse>({
      url: `${this.baseUrl}/v1/files/${fileKey}/variables`,
      method: 'POST',
      headers: {
        Accept: '*/*',
        'X-Figma-Token': this.token,
      },
      data: payload,
    });

    return resp.data;
  }
}
