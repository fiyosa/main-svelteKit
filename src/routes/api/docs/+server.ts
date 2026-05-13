import secretPrivate from '$config/secretPrivate'
import { ScalarApiReference } from '@scalar/sveltekit'
import type { RequestHandler } from '@sveltejs/kit'

const render = ScalarApiReference({
  url: secretPrivate.APP_ENV === 'local' ? '/api/openapi.json' : '/openapi.json',
  agent: { disabled: true },
  layout: 'modern',
  mcp: { disabled: true },
  hideClientButton: true,
  telemetry: false,
  theme: 'solarized',
  defaultOpenAllTags: false,
  defaultOpenFirstTag: false,
  showDeveloperTools: 'never',
})

export const GET: RequestHandler = () => {
  return render()
}
