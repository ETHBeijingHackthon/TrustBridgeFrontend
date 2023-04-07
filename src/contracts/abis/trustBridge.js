const address = import.meta.env.VITE_CONTRACT_TRUSTBRIDGE_ADDRESS

const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'collector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'NFTCollected',
        type: 'uint256',
      },
    ],
    name: 'NFTCollected',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'fid', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'sort', type: 'string' },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      { indexed: false, internalType: 'string', name: 'cover', type: 'string' },
      {
        indexed: false,
        internalType: 'string',
        name: 'mediaType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'multimedia',
        type: 'string',
      },
      { indexed: false, internalType: 'string', name: 'title', type: 'string' },
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    name: 'NFTCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reviewId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reviewCount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nftScore',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'reviewer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'score',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'mediaType',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'multimedia',
        type: 'string',
      },
    ],
    name: 'NFTReviewed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_nftId', type: 'uint256' }],
    name: 'collectNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_sort', type: 'string' },
      { internalType: 'string', name: '_coverURI', type: 'string' },
      { internalType: 'string', name: '_mediaType', type: 'string' },
      { internalType: 'string', name: '_multimedia', type: 'string' },
      { internalType: 'string', name: '_title', type: 'string' },
      { internalType: 'string', name: '_description', type: 'string' },
    ],
    name: 'createNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_nftId', type: 'uint256' }],
    name: 'getCollectionCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'nfts',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'fid', type: 'uint256' },
      { internalType: 'string', name: 'sort', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'string', name: 'coverURI', type: 'string' },
      { internalType: 'string', name: 'mediaType', type: 'string' },
      { internalType: 'string', name: 'multimedia', type: 'string' },
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'uint256', name: 'reviewCount', type: 'uint256' },
      { internalType: 'uint256', name: 'score', type: 'uint256' },
      { internalType: 'uint256', name: 'collectCount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_nftId', type: 'uint256' },
      { internalType: 'uint256', name: '_score', type: 'uint256' },
      { internalType: 'string', name: '_description', type: 'string' },
      { internalType: 'string', name: '_mediaType', type: 'string' },
      { internalType: 'string', name: '_multimedia', type: 'string' },
    ],
    name: 'reviewNFT',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'reviews',
    outputs: [
      { internalType: 'uint256', name: 'nftId', type: 'uint256' },
      { internalType: 'uint256', name: 'reviewId', type: 'uint256' },
      { internalType: 'address', name: 'reviewer', type: 'address' },
      { internalType: 'uint256', name: 'score', type: 'uint256' },
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'string', name: 'multimedia', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export { address, abi }