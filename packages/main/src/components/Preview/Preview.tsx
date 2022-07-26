import { TabPane, Tabs, Typography } from '@douyinfe/semi-ui';
import React from 'react';
import IframeText from '../../assets/iframe.html?url';
import { compiler } from '../Editor/Editor';
export const now = performance.now();

function toProductionCode(compiledCode: string) {
  // 此处的document.getElementById('app') 与iframe对应
  const lastCode = (componentName = 'App') => `
  ;ReactDOM.createRoot(document.getElementById('app')).render(${componentName}());
`;
  return compiledCode
    .replaceAll('App', 'APP')
    .replace(/export\sdefault\s(.+);?/, ';const App = $1;')
    .concat(lastCode());
}

const Preview = () => {
  const [error, setError] = useSafeState('');
  const [compiledCode, setCompiledCode] = useSafeState('');

  const iframe = useRef(null as unknown as HTMLIFrameElement);
  const [src, setSrc] = useState(IframeText);
  const postCompiledCodeToIframe = useCallback((compiledCode: string) => {
    const CODE_UPDATE = 'CODE_UPDATE';
    const blob = new Blob([toProductionCode(compiledCode)], {
      type: 'text/javascript',
    });
    const src = URL.createObjectURL(blob);
    iframe.current.contentWindow!.postMessage(
      { event: CODE_UPDATE, value: src },
      '*',
    );
    return () => URL.revokeObjectURL(src);
  }, []);

  useEffect(() => {
    compiler.addEventListener('message', ({ data }) => {
      const { event, compiled, error } = data;

      console.log('收到worker传来的数据', data);
      if (event === 'ERROR')
        return setError(error);

      else setError('');
      setCompiledCode(compiled);

      postCompiledCodeToIframe(compiled);
      console.log(
        `Compilation took: ${(performance.now() - now).toFixed(2)}ms`,
      );
    });
  }, []);
  return (
    <div h="full" w="full">
      <div>
        <Tabs type="line">
          <TabPane tab="preview" itemKey="1">
            <iframe
              title="IFRAME REPL"
              className="overflow-auto p-0 dark:bg-other block h-full w-full bg-white row-start-5"
              ref={iframe}
              src={src}
              sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
            ></iframe>
          </TabPane>
          <TabPane tab="output" itemKey="2">
            {error
              ? (
              <pre dangerouslySetInnerHTML={{ __html: error }} />
                )
              : (
              <pre>{compiledCode}</pre>
                )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Preview;
