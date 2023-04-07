import instance from '@/utils/axios'

export const getNftcreatedEntities = (query) => {
  return instance.post('/trustbridge', {
    query: `{ nftcreatedEntities(${query}) { id, nftId, owner, sort, coverUri, mediaType, multimedia, title, description, score, collectCount,reviewCount, fid } }`,
  })
}
