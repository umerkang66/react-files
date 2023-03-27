import React from 'react';

import { async } from 'regenerator-runtime';

// Importing files that we created
import axiosUnsplash from '../api/unsplash.js';
import SearchBar from './SearchBar.js';
import ImageList from './ImageList.js';

class App extends React.Component {
  state = { images: [] };

  // it is a callback function down in the render method (in the onSubmit higher order function) so we have to change it into the arrow function
  onSearchSubmit = async searchQuery => {
    try {
      // BY USING AXIOS METHOD
      const response = await axiosUnsplash.get('search/photos', {
        params: { query: searchQuery },
      });

      this.setState({ images: response.data.results });
    } catch (err) {
      console.error(`🚒🚒🚒, ${err.message}`);
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: '15px' }}>
        {/* The prop below onSubmit could be anything because it is not an actual form element but a component that we created */}
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
      </div>
    );
  }
}

export default App;
