import React from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';

import { Spinner } from './Spinner/Spinner';
import { Button } from './button/Button';
import { Modal } from './modal/Modal';
import styles from '../styles.module.css';

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default class App extends React.Component {
  state = {
    gallery: [],
    search: '',
    page: 1,
    error: null,
    showModal: false,
    loading: false,
    originalImageURL: '',
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

  getImages = () => {
    this.setState({ loading: true });

    axios
      .get(
        `/?q=${this.state.search}&page=${this.state.page}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
      )
      .then(response => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...response.data.hits],
          loading: false,
          page: prevState.page + 1,
        }));
      })
      .finally(() => {
        this.setState({ loading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  getSearch = search => {
    this.setState({ search, gallery: [], page: 1 });
  };

  toggleModal = () => {
    this.setState(({ ShowModal }) => ({ showModal: !ShowModal }));
  };

  hiddenModal = () => {
    this.setState({ showModal: false });
  };

  fetchImages = url => {
    this.setState({ originalImageURL: url });
  };

  render() {
    const { originalImageURL, loading, gallery, showModal } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar getSearch={this.getSearch} />
        <ImageGallery
          fetchImages={this.fetchImages}
          toggleModal={this.toggleModal}
          gallery={gallery}
        />
        {loading && <Spinner />}
        {gallery.length > 0 && !loading && (
          <Button getImages={this.getImages} />
        )}
        {showModal && (
          <Modal
            hiddenModal={this.hiddenModal}
            largeImageURL={originalImageURL}
          />
        )}
      </div>
    );
  }
}
