import { config } from '@/config'

export const useDocumentTitle = (title: string) => {
  document.title = title || config.title
}
