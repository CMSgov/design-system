import React from 'react';

interface ViewSourceLinkProps {
  sourceFilePath: string;
}

const ViewSourceLink = ({ sourceFilePath }: ViewSourceLinkProps) => {
  return (
    <p>
      <a
        href={`https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/${sourceFilePath}`}
      >
        View Source File
      </a>
    </p>
  );
};

export default ViewSourceLink;
