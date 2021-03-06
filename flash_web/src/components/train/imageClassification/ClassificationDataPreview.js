import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

class ClassificationDataPreview extends React.Component {
  renderCard(imgUrl, imgId) {
    return (
      <div className="col mb-3" key={imgId}>
        <div
          className="card card-hover shadow bg-white rounded"
          style={{ width: '5rem' }}
        >
          <img src={imgUrl} className="card-img-top" alt={`data-${imgId}`} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.props.imgList ? (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 mt-5 mx-auto">
            {_.map(this.props.imgList, (image, imgId) =>
              this.renderCard(image, imgId)
            )}
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  classification: { currentClass, datasetPreview },
}) => {
  return { imgList: datasetPreview[currentClass] };
};

export default connect(mapStateToProps)(ClassificationDataPreview);
