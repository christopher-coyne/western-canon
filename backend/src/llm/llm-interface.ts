export interface LlmCallerInterface {
    getPlaylist: () => any
    getCategories: (prompt: string, quantity: number) => any
    makeCall: (prompt: string) => any
}