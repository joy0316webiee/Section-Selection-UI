const puppeteer = require('puppeteer');

exports.resolvers = {
  Query: {
    urlScreen: async (_, { url }, __) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page._client.send('Animation.setPlaybackRate', { playbackRate: 2 });

      const screenHeight = await page.evaluate(() => {
        return document.documentElement.offsetHeight;
      });

      const b64string = await page.screenshot({ encoding: 'base64', fullPage: true });

      await browser.close();

      return {
        screenHeight,
        screenWidth: 1920,
        image: b64string
      };
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
