import { Box, Image } from '@chakra-ui/react'

export function PlayStoreBadge() {
  return (
    <Box>
      <Image
        src="./src/assets/images/PlayStoreBadge.png"
        alt="Get it on Google Play"
        width={300}
        height={24}
      />
    </Box>
  )
}