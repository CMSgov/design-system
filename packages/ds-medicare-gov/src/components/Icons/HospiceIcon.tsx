import type * as React from 'react';
import { SvgIcon } from '@cmsgov/design-system';
import { IconCommonProps } from '@cmsgov/design-system';

const defaultProps = {
  className: '',
  title: 'Hospice',
  viewBox: '0 0 32 32',
};

function HospiceIcon(props: IconCommonProps): React.ReactElement {
  const iconCssClasses = `ds-c-icon--hospice ${props.className || ''}`;

  return (
    <span className="icon-wrapper">
      <SvgIcon {...defaultProps} {...props} className={iconCssClasses}>
        <path
          d="m6.046 9.082 9.74-7.1 9.738 7.1a.885.885 0 0 0 1.238-.194.886.886 0 0 0-.194-1.238L16.307.17a.89.89 0 0 0-1.044 0L5.003 7.65a.886.886 0 1 0 1.043 1.432"
          fill="#1e3c70"
        />
        <path
          d="M20.067 7.934c-2.413-.795-3.965 1.233-4.282 1.696-.316-.463-1.87-2.491-4.282-1.696C7.9 9.12 7.586 15.03 15.724 19.496l.061.034.061-.035c8.138-4.465 7.824-10.375 4.22-11.561"
          fill="#1e3c70"
        />
        <mask
          id="a"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="16"
          y="10"
          width="13"
          height="22"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.949 10.667h11.487V31.59H16.949z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#a)">
          <path
            d="M27.817 10.667c-1.174 0-1.586 1.192-1.586 2.429l-.426 4.04c.093.158.155.312.195.448.18.623.069 1.333-.313 1.998-.513.895-2.775 3.977-2.871 4.108a.507.507 0 0 1-.737.098.574.574 0 0 1-.094-.777c.023-.031 2.322-3.162 2.803-4.002.221-.387.297-.789.206-1.102q-.117-.402-.6-.64c-.722-.353-1.251.23-1.308.297a.5.5 0 0 1-.27.158c-.425.444-2.683 2.812-3.458 3.689-1.548 1.75-2.41 3.135-2.41 4.618v5.56H22.1v-2.077c0-1.01.368-1.98 1.027-2.713l4.756-5.483c.355-.395.553-.918.553-1.462V11.32c0-.361-.277-.653-.62-.653"
            fill="#1e3c70"
          />
        </g>
        <mask
          id="b"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="3"
          y="10"
          width="12"
          height="22"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M3 10.667h11.487V31.59H3z" fill="#fff" />
        </mask>
        <g mask="url(#b)">
          <path
            d="M8.635 17.737a.5.5 0 0 1-.285-.173c-.061-.071-.59-.649-1.309-.296q-.482.237-.6.64c-.09.312-.015.714.207 1.101.482.84 2.78 3.97 2.803 4.002a.574.574 0 0 1-.094.778.504.504 0 0 1-.737-.099c-.096-.13-2.358-3.213-2.871-4.107-.382-.667-.493-1.376-.313-2 .04-.135.102-.29.194-.447l-.425-4.04c0-1.237-.413-2.43-1.586-2.43-.342 0-.619.293-.619.654v8.534c0 .544.198 1.067.553 1.462l4.756 5.483a4.06 4.06 0 0 1 1.027 2.714v2.077h5.151v-5.561c0-1.483-.86-2.868-2.409-4.618-.766-.866-2.984-3.193-3.443-3.674"
            fill="#1e3c70"
          />
        </g>
      </SvgIcon>
    </span>
  );
}

export default HospiceIcon;
