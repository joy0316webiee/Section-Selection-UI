import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { URLSection } from '../components';
import {
  AppState,
  AppMutationData,
  AppMutationVariables,
  SectionBox
} from '../interfaces';
import { UrlBoxSelectionMutation } from '../queries';

import './App.scss';

class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    url: '',
    urlEdit: '',
    coordinates: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    }
  };

  onChangeUrl: (e: any) => void = e => {
    this.setState({ urlEdit: e.target.value });
  };

  onUpdateUrl = () =>
    this.setState(prevState => ({
      url: prevState.urlEdit
    }));

  onSectionSelected = (
    coordinates: SectionBox,
    urlBoxSelection: MutationFn<AppMutationData, AppMutationVariables>
  ) => {
    this.setState({ coordinates }, () => {
      urlBoxSelection().then(result => {
        console.log(result);
      });
    });
  };

  render() {
    const { url, urlEdit, coordinates } = this.state;

    return (
      <Mutation<AppMutationData, AppMutationVariables>
        mutation={UrlBoxSelectionMutation}
        variables={{ url, coordinates }}
      >
        {(urlBoxSelection, { data, loading, error }) => {
          return (
            <div className="app-container">
              <div className="screenshot-controls">
                <input type="url" value={urlEdit} onChange={this.onChangeUrl} />
                <button onClick={this.onUpdateUrl}>Get ScreenShot</button>
              </div>

              <URLSection
                url={url}
                onSelected={cordinates =>
                  this.onSectionSelected(cordinates, urlBoxSelection)
                }
              />
              {loading && <div>Loading...</div>}
              {error && <div>{error.message}</div>}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default App;
