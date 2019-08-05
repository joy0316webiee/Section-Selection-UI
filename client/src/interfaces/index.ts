import * as React from 'react';
import { string } from 'prop-types';
import { Crop } from 'react-image-crop';
// App
export interface AppState {
  url: string;
  urlEdit: string;
  coordinates: SectionBox;
}

export interface AppMutationData {
  urlBoxSelection: {
    error: boolean;
    message: string;
  };
}

export interface AppMutationVariables {
  url: string;
  coordinates: SectionBox;
}

export interface BaseMutationResponse {
  error: boolean;
  message: string;
}

// URL Section
export interface URLSectionProps {
  url: string;
  onSelected: (coordinates: SectionBox) => void;
}

export interface URLSectionState {
  src: string;
  crop: Crop;
  croppedImageUrl: string;
}

export interface SectionBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// CanvasScreen
export interface CanvasScreenProps {
  url: string;
  onLoad: (image: HTMLImageElement) => void;
}

export interface CanvasScreenQueryData {
  urlScreen: {
    screenWidth: number;
    screenHeight: number;
    image: string;
  };
}

export interface CanvasScreenQueryVariables {
  url: string;
}
