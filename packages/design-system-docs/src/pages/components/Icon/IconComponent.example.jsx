import {
  AddIcon,
  AlertCircleIcon,
  ArrowsStackedIcon,
  ArrowIcon,
  BuildingCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  CloseIconThin,
  DownloadIcon,
  ImageIcon,
  InfoCircleIcon,
  InfoCircleIconThin,
  LockIcon,
  NextIcon,
  PdfIcon,
  RemoveIcon,
  StarIcon,
  UsaFlagIcon,
  WarningIcon,
} from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <AddIcon />
    <AlertCircleIcon />
    <ArrowsStackedIcon />
    <ArrowIcon />
    <ArrowIcon direction="down" />
    <ArrowIcon direction="left" />
    <ArrowIcon direction="right" />
    <BuildingCircleIcon />
    <CheckCircleIcon />
    <CheckIcon />
    <CloseIcon />
    <CloseIconThin />
    <DownloadIcon />
    <ImageIcon />
    <InfoCircleIcon />
    <InfoCircleIconThin />
    <LockIcon />
    <NextIcon />
    <PdfIcon />
    <RemoveIcon />
    <StarIcon />
    <StarIcon isFilled />
    <UsaFlagIcon />
    <WarningIcon />
  </>,
  document.getElementById('js-example')
);
