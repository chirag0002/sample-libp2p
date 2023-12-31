import { createLibp2p } from 'libp2p'
import { mdns } from '@libp2p/mdns'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'

const createNode = () => {
  return createLibp2p({
    addresses: {
      listen: ['/ip4/0.0.0.0/tcp/0']
    },
    transports: [
      tcp()
    ],
    streamMuxers: [
      yamux(),mplex()
    ],
    connectionEncryption: [
      noise()
    ],
    peerDiscovery: [
      mdns({
        interval: 20e3
      })
    ]
  })
}

const [node1, node2, node3] = await Promise.all([
    createNode(),
    createNode(),
    createNode(),
])
  
  node1.addEventListener('peer:discovery', (evt) => console.log('Discovered by 1:', evt.detail.id.toString()))
  node2.addEventListener('peer:discovery', (evt) => console.log('Discovered by 2:', evt.detail.id.toString()))
  node3.addEventListener('peer:discovery', (evt) => console.log('Discovered by 3:', evt.detail.id.toString()))