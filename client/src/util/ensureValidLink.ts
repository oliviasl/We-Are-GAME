export default function ensureValidLink(url: string) {
  if (url != null && !url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
}