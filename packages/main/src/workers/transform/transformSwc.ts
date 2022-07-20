const transformSwc = async (_code: string) => {
  const { default: initSwc, transformSync } = await import('@swc/wasm-web')
  await initSwc()

  const code = transformSync(_code, {
    jsc: {
      parser: {
        syntax: 'typescript', // 'ecmascript',
        jsx: true,
        tsx: true,
      },
      target: 'es2022',
      transform: {
        react: {
          useBuiltins: true,
        },
      },
    },
  })
  return code.code as string
}

export default transformSwc;
