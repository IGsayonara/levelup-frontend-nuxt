export const useDefaultFroalaConfig = () => {
  const froalaConfig = {
    heightMax: 400, // Maximum height
    toolbarInline: false, // Example setting
    placeholderText: 'Start typing your content...',
    charCounterCount: true, // Show character counter
  }

  return {
    config: froalaConfig,
  }
}
