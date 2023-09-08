import { Song } from '@/types'
import { FC } from 'react'

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({}) => {
  return <div>PlayerContent</div>
}

export default PlayerContent