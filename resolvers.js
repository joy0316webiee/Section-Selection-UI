const puppeteer = require('puppeteer');

exports.resolvers = {
  Query: {
    urlScreen: async (_, { url }, __) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const dimensions = await page.evaluate(() => {
        return {
          screenWidth: document.documentElement.clientWidth,
          screenHeight: document.documentElement.clientHeight
        };
      });
      const b64string = await page.screenshot({ encoding: 'base64' });

      await browser.close();

      return { ...dimensions, image: b64string };
    }
  },
  Mutation: {
    urlBoxSelection: async (_, { url, coordinates }, __) => {
      console.log('urlBox:', url, coordinates);
      const responseMessage = {
        error: false,
        message: 'success'
      };
      return responseMessage;
    }
  }
};
