module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // plugins should be 
        'react-native-reanimated/plugin'
      ],
    };
  };