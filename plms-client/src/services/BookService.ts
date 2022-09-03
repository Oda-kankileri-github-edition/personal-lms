import axiosInstance from './axiosInstance';
import {
  GetBooksRequest,
  GetBooksResponse,
} from '@interfaces/BookService.types';

const BookService = {
  async getBooks(req: GetBooksRequest) {
    // create query string from request object
    let queryString = '';
    if (req.queryParamaters) {
      let queryParamaters: string[] = [];
      if (req.queryParamaters.q) {
        queryParamaters.push('q=' + req.queryParamaters.q);
      }
      if (req.queryParamaters.status) {
        queryParamaters.push('status=' + req.queryParamaters.status.toString());
      }
      if (req.queryParamaters.tag) {
        queryParamaters.push('tag=' + req.queryParamaters.tag);
      }
      if (queryParamaters.length > 0) {
        queryString = '?' + queryParamaters.join('&');
      }
    }
    return await axiosInstance.post<GetBooksResponse>(`/books${queryString}`);
  },
};
export default BookService;
