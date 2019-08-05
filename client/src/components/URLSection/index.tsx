import * as React from 'react';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import { CanvasScreen } from '../../components';
import { URLSectionProps, URLSectionState, SectionBox } from '../../interfaces';

import './styles.scss';

class URLSection extends React.PureComponent<URLSectionProps, URLSectionState> {
  state: URLSectionState = {
    src: '',
    crop: {
      unit: '%',
      width: 100
    },
    croppedImageUrl: ''
  };

  imageRef: HTMLImageElement | undefined;
  fileUrl?: string;

  onCanvasLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;
  };

  onCropComplete = async (crop: Crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl: string = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
    const coordinates = await this.getCoordinates(crop);
    this.props.onSelected(coordinates);
  };

  onCropChange = (crop: Crop, _: PercentCrop) => {
    this.setState({ crop });
  };

  getCoordinates: (crop: Crop) => SectionBox = crop => {
    return {
      x1: Math.floor(crop.x!),
      y1: Math.floor(crop.y!),
      x2: Math.floor(crop.x! + crop.width!),
      y2: Math.floor(crop.y! + crop.height!)
    };
  };

  getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string): Promise<string> {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(
      image,
      crop.x! * scaleX,
      crop.y! * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    );

    return new Promise((resolve, reject) => {
      canvas!.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        window.URL.revokeObjectURL(this.fileUrl!);
        this.fileUrl = window.URL.createObjectURL(blob);
        console.log(this.fileUrl);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  renderCanvas = () => <CanvasScreen url={this.props.url} onLoad={this.onCanvasLoaded} />;

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="url-section__wrapper">
        <ReactCrop
          src={src}
          crop={crop}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
          renderComponent={this.renderCanvas()}
        />
        {croppedImageUrl && <img src={croppedImageUrl} alt="Crop" />}
      </div>
    );
  }
}

export { URLSection };
