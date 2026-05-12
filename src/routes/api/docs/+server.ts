// routes/+server.ts
import secretPrivate from '$config/secretPrivate'
import { ScalarApiReference } from '@scalar/sveltekit'
import type { RequestHandler } from '@sveltejs/kit'

const render = ScalarApiReference({
  url: '/api/openapi.json',
  agent: { disabled: true },
  layout: 'modern',
  mcp: { disabled: true },
  hideClientButton: true,
  telemetry: false,
  theme: 'solarized',
  showDeveloperTools: secretPrivate.APP_ENV === 'local' ? 'always' : 'never',
})

export const GET: RequestHandler = () => {
  return render()
}
