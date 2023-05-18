

//export const apiInterceptor = (url,token, data) => 

export const showshortWords = (str) => {
    if (str.length <= 17) {
        return str;
      } else {
        return str.slice(0, 23) + '...';
      }
  }
  