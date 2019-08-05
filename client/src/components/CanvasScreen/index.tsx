import * as React from 'react';
import { Query } from 'react-apollo';
import validUrl from 'valid-url';

import {
  CanvasScreenProps,
  CanvasScreenQueryData,
  CanvasScreenQueryVariables
} from '../../interfaces';
import { UrlScreenQuery } from '../../queries';

import './styles.scss';

const CanvasScreen: React.FC<CanvasScreenProps> = ({ url, onLoad }) => {
  const displayScreenShoot = () => (
    <Query<CanvasScreenQueryData, CanvasScreenQueryVariables>
      query={UrlScreenQuery}
      variables={{ url }}
    >
      {({ data, loading, error }) => {
        if (loading) return <span className="info">Loading...</span>;
        if (error) return <span className="error">{error.message}</span>;

        const base64ImageData = `data:image/png;base64, ${data!.urlScreen!.image!}`;

        return (
          <img
            className="screenshot"
            src={base64ImageData}
            alt="screenshot"
            crossOrigin="anonymous"
            onLoad={e => onLoad(e.target as HTMLImageElement)}
          />
        );
      }}
    </Query>
  );

  return validUrl.isUri(url) ? displayScreenShoot() : <span>Enter valid url</span>;
};

export { CanvasScreen };
