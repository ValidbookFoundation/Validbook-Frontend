export function likeStorySuccess(stories, action) {
  return stories.map(story => {
    if (story.id === action.story_id) {
      return {
        ...story,
        likes: action.result.data.likes,
      };
    }
    return {
      ...story,
    };
  });
}

export function like(stories, action) {
  return stories.map(story => {
    if (story.id === action.story_id) {
      const likes = Object.assign({}, story.likes, {
        is_liked: !story.likes.is_liked
      });
      return {
        ...story,
        likes
      };
    }
    return {
      ...story
    };
  });
}
