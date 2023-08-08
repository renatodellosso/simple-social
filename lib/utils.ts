import { DisplayedPost, Post } from "./types";

export var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

export function getDisplayedPostFromPost(post: Post): DisplayedPost {
  return {
    authorName: post.authorName ?? null,
    authorAvatar: post.authorAvatar ?? null,
    time: post.time ?? null,
    text: post.text ?? null
  };
}