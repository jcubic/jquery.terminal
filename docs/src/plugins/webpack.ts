export default function WebpackPlugin() {
  return {
    name: 'webpack',
    configureWebpack() {
      return {
        resolve: {
          alias: {
            'figlet': 'figlet/lib/figlet.js'
          }
        }
      };
    },
  };
}
