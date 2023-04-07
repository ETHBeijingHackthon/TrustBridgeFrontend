import instance from '@/utils/axios'

export const getNftcreatedEntities = (query) => {
  return instance.post('/trustbridge', {
    query: `{ nftcreatedEntities(${query}) { id, nftId, owner, sort, coverUri, mediaType, multimedia, title, description, score, collectCount,reviewCount, fid } }`,
  })
}

export const getNftreviewedEntities = (query) => {
  return instance.post('/trustbridge', {
    query: `{nftreviewedEntities(${query}) {id mediaType multimedia nftId reviewer score description}}`,
  })
}

export const getNftcollectedEntities = (query) => {
  return instance.post('/trustbridge', {
    query: `{nftcollectedEntities(${query}) {nftId}}`,
  })
}

export const queryTrustBridge = (query) => {
  return instance.post('/trustbridge', { query })
}
