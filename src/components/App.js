import React from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
// import { ImageGalleryItem } from './imageGalleryItem/ImageGalleryItem';
// import {Loader} from './loader/Loader';
// import {Button} from './button/Button';
// import {Modal} from './modal/Modal';
import styles from '../styles.module.css';

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default class App extends React.Component {
  state = {
    gallery: [],
    search: '',
    page: '',
  };

  getImages = async search => {
    try {
      const gallery = await axios.get(
        `/?q=${search}&page=${
          this.state.page
        }&key=${'17952802-daa7906d75026c0e61ecd1623'}&image_type=photo&orientation=horizontal&per_page=12`,
      );
      this.setState({ gallery: gallery.data.hits });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    if (this.state.search) {
      this.getImages(this.state.search);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.getImages(this.state.search);
    }
  }

  getSearch = search => {
    this.setState({ search });
  };

  render() {
    return (
      <div className={styles.App}>
        <Searchbar getSearch={this.getSearch} />
        <ImageGallery gallery={this.state.gallery} />
      </div>
    );
  }
}
