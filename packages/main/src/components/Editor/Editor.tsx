import React from 'react';
import { TextArea } from '@douyinfe/semi-ui';
import CompilerWorker from '../../workers/compiler?worker';
import debounce from '../../utils/debounce';

export const compiler = new CompilerWorker();
const applyCompilation = debounce((message: any) => {
  compiler.postMessage(message);
});
const Editor = () => {
  const [code, setCode] = useLocalStorageState<string | undefined>('code', {
    defaultValue: 'const App = () => <SemiUI.Button>hello React</SemiUI.Button>;\nexport default App;',
  });

  useEffect(() => {
    applyCompilation({ event: 'SWC', source: code });
  }, [code]);

  return (
    <div>
      <TextArea
        showClear
        value={code}
        onChange={value => setCode(value)}
      />
    </div>
  );
};

export default Editor;
