import React, { Component } from 'react';
import { async } from 'regenerator-runtime';

// Components we created
import SearchBar from './SearchBar.js';
import VideoList from './VideoList.js';
import VideoDetail from './VideoDetail.js';
import { axiosYoutube } from '../helper.js';

class App extends Component {
  state = { items: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('buildings');
  }

  onTermSubmit = async term => {
    const response = await axiosYoutube.get('/search', {
      params: { q: term },
    });

    const { items } = response.data;
    this.setState({ items, selectedVideo: items[0] });
  };

  // We will send this callback to video list then to the video item
  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div style={{ marginTop: '14px' }} className="App ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.items}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
