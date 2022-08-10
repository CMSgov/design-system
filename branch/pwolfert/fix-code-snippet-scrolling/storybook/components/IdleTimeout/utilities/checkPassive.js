// checks if the browser supports addEventListener options parameter defined as an object
// older browsers think the third parameter is a boolean
export const checkPassiveSupport = () => {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        // This function will be called when the browser
        //   attempts to access the passive property.
        passiveSupported = true;
        return false;
      },
    };

    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
};
