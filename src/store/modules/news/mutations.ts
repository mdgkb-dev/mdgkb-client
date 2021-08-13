import { MutationTree } from 'vuex';

import FileInfo from '@/classes/File/FileInfo';
import News from '@/classes/news/News';
import NewsComment from '@/classes/news/NewsComment';
import NewsImage from '@/classes/news/NewsImage';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import ITag from '@/interfaces/news/ITag';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: INews[]) {
    state.news = items.map((i: INews) => new News(i));
  },
  appendToAll(state, items: INews[]) {
    if (items.length === 0) {
      state.allNewsLoaded = true;
      return;
    }
    state.allNewsLoaded = false;
    const news = items.map((i: INews) => new News(i));
    state.news.push(...news);
  },
  set(state, item?: INews) {
    state.newsItem = new News(item);
    if (state.newsItem.fileInfo.fileSystemPath) state.previewFileList[0] = state.newsItem.fileInfo.getFileListObject();
    if (state.newsItem.mainImage.fileSystemPath) state.mainImageList[0] = state.newsItem.mainImage.getFileListObject();
    state.galleryList = [];
    state.newsItem.newsImages.forEach((i: INewsImage) => {
      if (!i.fileInfo) return;
      const file = i.fileInfo.getFileListObject();
      if (file) state.galleryList.push(file);
    });
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  clearPreviewFile(state) {
    if (!state.newsItem) return;
    state.newsItem.fileInfo = new FileInfo();
  },
  setCalendarNews(state, items: INews[]) {
    if (!items) return;
    state.calendarNews = items.map((i: INews) => new News(i));
  },
  remove(state, id: string) {
    const index = state.news.findIndex((i: INews) => i.id === id);
    state.news.splice(index, 1);
  },
  addFilterTag(state, tag: ITag) {
    if (!state.filterTags.some((i) => i.id === tag.id)) {
      state.filterTags.push(tag);
    }
  },
  removeFilterTag(state, id: string) {
    const index = state.filterTags.findIndex((i: ITag) => i.id === id);
    state.filterTags.splice(index, 1);
  },
  resetFilterTags(state) {
    state.filterTags = [];
  },
  setFilteredNews(state) {
    if (state.filterTags.length) {
      state.filteredNews = state.news.filter((newsItem) => {
        return state.filterTags.every((tag) => {
          return newsItem.tags?.some((newsTag) => {
            return newsTag.id === tag.id;
          });
        });
      });
    } else {
      state.filteredNews = state.news;
    }
  },
  chooseTag(state, tag: ITag) {
    if (!state.newsItem || !state.newsItem.tags) return;
    const index = state.newsItem.tags.findIndex((t: ITag) => tag.id === t.id);
    index === -1 ? state.newsItem.tags.push(tag) : state.newsItem.tags.splice(index, 1);
  },
  setLikeNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    if (news) news.newsLikes.push(newsLike);
    if (state.newsItem) state.newsItem.newsLikes.push(newsLike);
  },
  setComment(state, item: INewsComment) {
    if (state.newsItem) state.newsItem.newsComments.push(item);
  },
  removeComment(state, commentId: string) {
    if (state.newsItem) {
      const index = state.newsItem.newsComments.findIndex((item: NewsComment) => item.id === commentId);
      state.newsItem.newsComments.splice(index, 1);
    }
  },
  editComment(state, commentId: string) {
    if (state.newsItem) {
      const comment = state.newsItem.newsComments.find((item: NewsComment) => item.id === commentId);
      if (comment) comment.isEditing = true;
    }
  },
  setFileInfo(state, fileInfo: IFileInfo) {
    if (state.newsItem) {
      state.newsItem.fileInfo = fileInfo;
    }
  },
  setMainImage(state, fileInfo: IFileInfo) {
    if (state.newsItem) {
      state.newsItem.mainImage = fileInfo;
    }
  },
  updateComment(state, commentId: string) {
    if (state.newsItem) {
      state.newsItem.newsComments = state.newsItem.newsComments.map((item: NewsComment) => {
        if (item.id === commentId) item.isEditing = false;
        return item;
      });
    }
  },
  deleteLikeFromNews(state, newsLike: INewsLike) {
    const news = state.news.find((i: INews) => i.id === newsLike.newsId);
    const deleteLike = (news: INews) => {
      const index = news.newsLikes.findIndex((i: INewsLike) => i.id === newsLike.id);
      news.newsLikes.splice(index);
    };
    if (news) deleteLike(news);
    if (state.newsItem) deleteLike(state.newsItem);
  },
  deleteCommentFromNews(state, item: INewsComment) {
    const news = state.news.find((i: INews) => i.id === item.newsId);
    if (news) {
      const index = news.newsComments.findIndex((i: INewsComment) => i.id === item.id);
      news.newsLikes.splice(index);
    }
  },
  updateCalendarMeta(state, meta: ICalendarMeta) {
    state.calendarMeta = meta;
  },
  pushToNewsImages(state, file: IFile) {
    if (!state.newsItem) return;
    const image = FileInfo.CreatePreviewFile(file, 'gallery');
    if (image.fileSystemPath) state.newsItem.newsImagesNames.push(image.fileSystemPath);
    state.newsItem.newsImages.push(new NewsImage({ fileInfo: image }));
  },
  setPreviewFile(state, file: IFile) {
    state.newsItem.fileInfo.file = file.blob;
    state.newsItem.fileInfo.category = 'previewFile';
    if (state.newsItem.fileInfo.fileSystemPath) {
      state.previewFileList[0] = { name: state.newsItem.fileInfo.fileSystemPath, url: file.src };
    }
  },
  saveFromCropperMain(state, file: IFile) {
    state.newsItem.mainImage.file = file.blob;
    state.newsItem.mainImage.category = 'mainImage';
    if (state.newsItem.mainImage.fileSystemPath) {
      state.mainImageList.push({ name: state.newsItem.mainImage.fileSystemPath, url: file.src });
    }
  },
  saveFromCropperGallery(state, file: IFile) {
    const prevFileInfo = state.newsItem.newsImages[state.curGalleryCropIndex].fileInfo;
    if (!prevFileInfo) return;
    const fileInfo = FileInfo.CreatePreviewFile(file, 'gallery');
    fileInfo.fileSystemPath = prevFileInfo.fileSystemPath;

    const i = state.newsItem.newsImagesNames.findIndex((i: string) => i === fileInfo.fileSystemPath);
    if (i < 0 && fileInfo.fileSystemPath) state.newsItem.newsImagesNames.push(fileInfo.fileSystemPath);

    state.newsItem.newsImages[state.curGalleryCropIndex].fileInfo = fileInfo;
    if (fileInfo.fileSystemPath) {
      state.galleryList[state.curGalleryCropIndex] = {
        name: fileInfo.fileSystemPath,
        url: file.src,
      };
    }
    console.log(state.newsItem.newsImages);
  },
  removeFromGallery(state, file: IFile) {
    const index = state.galleryList.findIndex((i) => i.name === file.name);
    if (index > -1) {
      state.galleryList.splice(index, 1);
      const id = state.newsItem.newsImages[index].id;
      if (id) state.newsItem.newsImagesForDelete.push(id);
      state.newsItem.newsImages.splice(index, 1);
    }
  },
  setCurGalleryCropIndex(state, index: number) {
    state.curGalleryCropIndex = index;
  },
};

export default mutations;
