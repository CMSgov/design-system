import React from 'react';

interface ViewSourceLinkProps {
  sourceFilePath: string;
  packageName?: string;
}

const ViewSourceLink = ({ sourceFilePath, packageName = 'design-system' }: ViewSourceLinkProps) => {
  return (
    <p>
      <a
        href={`https://github.com/CMSgov/design-system/blob/master/packages/${packageName}/src/${sourceFilePath}`}
      >
        View Source File
      </a>
    </p>
  );
};

export default ViewSourceLink;
