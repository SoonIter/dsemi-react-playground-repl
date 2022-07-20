import run from '@jamesives/github-pages-deploy-action'

run({
  token: process.env.ACCESS_TOKEN,
  folder: 'build',
  repositoryName: 'JamesIves/github-pages-deploy-action',
  silent: true,
  workspace: 'packages/main',
  tag: 'v0.1',
})
