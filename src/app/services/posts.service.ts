import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';

import { ELebanonCity, Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  searchQuery$ = new Subject<string>();
  private pagesInput = new Subject<{
    term?: string;
    location?: ELebanonCity;
  }>();
  pagesOutput!: Observable<Post[]>;

  constructor(private http: HttpClient) {
    this.initialize();
  }

  initialize() {
    this.pagesOutput = this.pagesInput.pipe(
      switchMap((data) => {
        let { term } = data;

        return this.http.get<any>(
          `http://localhost:3000/api/v1/post/search/${term}`
        );
      })
    );
  }

  search(term: string) {
    this.pagesInput.next({ term });
  }

  loaction(location: ELebanonCity) {
    this.pagesInput.next({ location });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/api/v1/post`);
  }

  updatePost(id: number, body: Post, imageUrl: string | ArrayBuffer | null) {
    const { title, description, priceInDollar, location } = body;

    return this.http.patch(`http://localhost:3000/api/v1/post/${id}`, {
      title,
      description,
      imageUrl,
      priceInDollar: +priceInDollar,
      location,
    });
  }

  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`http://localhost:3000/api/v1/post/my-posts`);
  }

  getPost(id: string | number | null) {
    return this.http.get<Post>(`http://localhost:3000/api/v1/post/${id}`);
  }

  addPost(
    title: string,
    description: string,
    imageUrl: string | ArrayBuffer | null,
    priceInDollar: number,
    location: ELebanonCity
  ): Observable<Post[]> {
    return this.http.post<any>(`http://localhost:3000/api/v1/post`, {
      title,
      description,
      imageUrl,
      priceInDollar,
      location,
    });
  }

  deletePosts(id: number) {
    return this.http.delete<Post>(`http://localhost:3000/api/v1/post/${id}`);
  }

  locationCount() {
    return this.http.get(`http://localhost:3000/api/v1/post/location`);
  }

  postsByMonth() {
    return this.http.get(`http://localhost:3000/api/v1/post/posts-by-month`);
  }
}
