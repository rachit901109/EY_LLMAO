import { Box, Image } from '@chakra-ui/react'

export function AppStoreBadge() {
  return (
    <Box>
      <Image
        src="./src/assets/images/AppStoreBadge.png"
        alt="Download on the App Store"
        width={80}
        height={20}
      />
    </Box>
  )
}
