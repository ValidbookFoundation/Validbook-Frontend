export const parseUserSlug = (path) => {
  return path.slice(1, (
    ~path.indexOf('/', 1) 
      ? path.indexOf('/', 1)
      : path.length
    )
  );
};

export const parseStoryId = (path) => {
  const text = '/story/';

  return path.slice(path.indexOf(text) + _getTextLength(text));
};

const _splitUrlToArray = (path) => {
  return path.split('/');
};

export const parsePublicAddress = (path) => {
  const text = '/identity-page/';
  const text_position = path.indexOf(text) + text.length;
  
  return path.slice(text_position, (
    ~path.indexOf('/', text_position)
      ? path.indexOf('/', text_position)
      : path.lenght
    )
  );
};

export const parseRandomNumber = (path) => {
  const text = '/identity-page/';
  const text_position = path.indexOf(text) + text.length;
  const public_ardress_position = path.indexOf('/', text_position) + 1;
  
  return public_ardress_position 
    ? path.slice(public_ardress_position, path.lenght)
    : null;
};

export const parseStoryLine = (path) => {
  const text = '/storyline/';
  return path.slice(path.indexOf(text) + _getTextLength(text));
};

export const parseMashup = (path) => {
  const text = '/channel/mashup';
  
  return path === '/' || path === text ? '' : path.slice(9);
};

export const parseBoxSlug = (path) => {
  const text = '/documents/';
  return ~path.indexOf(text) 
    ? 'desk'
    : path.slice(path.indexOf(text) + text.length);
};

const _getTextLength = (text) => {
  return text.length;
};

export const parseBookSlug = (path) => {
  const text = '/books/';
  const text_position = path.indexOf(text) + text.length;

  if (path.indexOf(text) === -1 || (text_position === path.length)) {
    return null;
  }

  return path.slice(text_position, (
    ~path.indexOf('/', text_position)
      ? path.indexOf('/', text_position)
      : path.lenght
    )
  );
};

export const parseStoryIdFromBookPage = (path) => {
  const path_arr = _splitUrlToArray(path);

  return path_arr[4] && path_arr[4] !== 'subbooks' && !isNaN(path_arr[4])
    ? path_arr[4]
    : null;
};

