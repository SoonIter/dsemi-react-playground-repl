import * as Ansi from 'ansi_up';
import transformSwc from './transform/transformSwc';

const CDN_URL = 'https://cdn.skypack.dev';

async function swc(code: string) {
  return { event: 'SWC', compiled: await transformSwc(code) };
}

self.addEventListener('message', async ({ data }) => {
  try {
    const { event, source, compileOpts } = data;

    switch (event) {
      case 'SWC':
        self.postMessage(await swc(source));
        break;
    }
  }
  catch (e) {
    const ansi_up = new Ansi.default(); //eslint-disable-line
    console.log(e);
    const errorMessage
      = typeof e === 'string'
        ? ansi_up.ansi_to_html(e)
        : e instanceof Error
          ? e.message
          : 'error';
    self.postMessage({ event: 'ERROR', error: errorMessage });
  }
});

export {};
