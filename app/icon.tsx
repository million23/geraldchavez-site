import { ImageResponse } from "next/server";

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

const Icon = () => {
  return new ImageResponse(
    (<img
      src="/favicon/favicon-32x32.png"
      width={size.width}
      height={size.height}
      alt="Icon"
    />),
    {
      width: size.width,
      height: size.height,
    }
  )
}

export default Icon