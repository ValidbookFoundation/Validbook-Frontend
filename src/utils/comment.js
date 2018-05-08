export function createNewComment(stories, action) {
  let fn;
  const receivedPreComment = Object.assign({}, {
    entity: action.entity,
    entity_id: action.entity_id,
    content: action.content,
    parent_id: action.parent_id,
    created_by: action.created_by,
    user: action.user,
    id: 'temporary',
  });

  return stories.map(story => {
    if (story.id === action.entity_id) {
      const searchComment = story.comments;
      if (receivedPreComment.parent_id === 0) {
        return {
          ...story,
          comments: [...story.comments, receivedPreComment]
        };
      }
      fn = function fnComments(searchComment) {
        searchComment.map(comment => {
          if (comment.id === receivedPreComment.parent_id) {
            const newComment = Object.assign(comment);
            if (newComment.children === null) {
              newComment.children = [];
              newComment.children.push(receivedPreComment);
            } else {
              newComment.children.push(receivedPreComment);
            }
            return {
              ...story,
              comments: [...story.comments, newComment]
            };
          }
          if (comment.children) {
            fn(comment.children);
          }
        });
      };
      fn(searchComment);
    }
    return {
      ...story,
    };
  });
}


export function createNewCommentSuccess(stories, action) {
  let fn;
  const receivedComment = action.result.data;

  return stories.map(story => {
    if (story.id === action.entity_id) {
      const searchComment = story.comments;
      fn = function fnComments(searchComment) {
        searchComment.map(comment => {
          if (comment.id === 'temporary') {
            const newComment = Object.assign(comment, {
              id: receivedComment.id,
              date: receivedComment.date,
              children: receivedComment.children,
            });
            return {
              ...story,
              comments: [...story.comments, newComment]
            };
          }
          if (comment.children) {
            fn(comment.children);
          }
        });
      };
      fn(searchComment);
    }
    return {
      ...story,
    };
  });
}
