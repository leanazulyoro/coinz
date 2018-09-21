/**
 * We do this to prevent a warning
 * @see https://github.com/facebook/jest/issues/4545#issuecomment-332762365
 * @param callback
 */
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

/**
 * @see https://github.com/akiran/react-slick#test-setup
 */
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};
