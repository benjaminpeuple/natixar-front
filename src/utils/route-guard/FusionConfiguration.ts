export interface FusionConfigParams {
  clientID: string
  serverUrl: string
  redirectUri: string
  enabled?: string
}

export const getFusionConfig = (): FusionConfigParams => ({
  clientID: import.meta.env.VITE_FUSION_AUTH_CLIENT_KEY,
  serverUrl: import.meta.env.VITE_FUSION_AUTH_SERVER_URL,
  redirectUri: import.meta.env.VITE_FUSION_AUTH_REDIRECT_URL,
  enabled: import.meta.env.VITE_FUSION_AUTH_ENABLED,
})
