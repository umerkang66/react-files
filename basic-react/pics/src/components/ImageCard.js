import './ImageList.scss';
import React from 'react';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans.bind(this));
  }

  setSpans() {
    const imgHeight = this.imageRef.current.clientHeight;
    const spans = Math.round(imgHeight / 10 + 1);
    this.setState({ spans });
  }

  render() {
    const { description, urls } = this.props.image;

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img
          ref={this.imageRef}
          alt={description}
          src={urls.regular}
          className="img-container__img--img-card"
        />
      </div>
    );
  }
}

export default ImageCard;
