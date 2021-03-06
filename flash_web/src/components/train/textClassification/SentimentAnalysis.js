import React from 'react';
import { connect } from 'react-redux';

import {
  clearTrainToken,
  setTrainConfig,
  clearTrainConfig,
  submitTrainRequest,
  clearTrainData,
} from '../../../actions';
import history from '../../../history';
import SACreate from './SACreate';
import TrainingSubmitModal from '../TrainingSubmitModal';

class SentimentAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.taskName = 'sentimentAnalysis';
    this.formName = `${this.taskName}ConfigForm`;

    this.configOptions = {
      modelTypes: ['LSTM', 'GRU'],
      modelFieldTitle: 'RNN Type',
      numRows: 10000,
      sizeLimit: 1000000, // In bytes (1 MB)
    };

    this.currentConfig = {
      modelType: 'LSTM',
      dataSplit: '70 : 30',
      optimizer: 'adam',
      learningRate: 0.001,
      ...this.props.currentTrainConfig,
    };
  }

  onSubmit = values => {
    this.props.submitTrainRequest({
      formName: this.formName,
      trainConfig: values,
    });
  };

  onModalDismiss = () => {
    this.props.clearTrainData(this.taskName);
    this.props.clearTrainToken();
    history.push('/inference');
  };

  componentDidMount() {
    this.props.setTrainConfig({
      taskName: this.taskName,
      config: {
        ...this.props.trainConfigOptions,
        ...this.configOptions,
        currentConfig: this.currentConfig,
      },
    });
  }

  componentWillUnmount() {
    this.props.clearTrainConfig(this.taskName);
  }

  renderModal() {
    return (
      <>
        {this.props.token ? (
          <TrainingSubmitModal onDismiss={this.onModalDismiss} />
        ) : (
          ''
        )}
      </>
    );
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-10 col-md-5 mx-auto">
            <div className="card mx-auto mt-4">
              <video
                playsInline="playsinline"
                autoPlay="autoplay"
                muted="muted"
                className="card-img-top"
              >
                <source
                  src={`${process.env.PUBLIC_URL}/assets/media/sentimentAnalysis.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6 mx-auto">
            <SACreate
              taskName={this.taskName}
              formName={this.formName}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
        {this.renderModal()}
      </>
    );
  }
}

const mapStateToProps = ({ serverConfig: { token } }) => {
  return { token };
};

export default connect(mapStateToProps, {
  clearTrainToken,
  setTrainConfig,
  clearTrainConfig,
  submitTrainRequest,
  clearTrainData,
})(SentimentAnalysis);
