import { useEffect, useState } from "react"
import _ from "lodash"
import { useAccount } from "wagmi"
import useBalanceOf from "../../hooks/useBalanceOf"
import useZoraMint from "../../hooks/useZoraMint"
import Button from "../Button"
import { useSpotifyProvider } from "../../providers/SpotifyProvider"

const PowerUpsButton = ({ onClick }) => {
  const [clicked, setClicked] = useState(false)
  const { mintWithRewards } = useZoraMint()
  const { balance, fetchBalance, cameraCount, moneyCount, heartCount } = useBalanceOf()
  const { isConnected } = useAccount()
  const { deviceId, login } = useSpotifyProvider()
  const channel = new MessageChannel()

  function callGodotFunction() {
    const iframe = document.querySelector("#godotGame") as HTMLIFrameElement
    if (!iframe) {
      return
    }
    const spotifyMoney = deviceId ? 1 : 0
    iframe.contentWindow.postMessage([heartCount, cameraCount, moneyCount + spotifyMoney], "*", [
      channel.port2,
    ])
  }

  useEffect(() => {
    const loading =
      _.isNull(balance) || _.isNull(heartCount) || _.isNull(moneyCount) || _.isNull(cameraCount)
    if (loading && isConnected) {
      setClicked(true)
      return
    }
    setClicked(false)
  }, [balance, isConnected, heartCount, moneyCount, cameraCount])

  return (
    <Button
      id="power-up"
      onClick={onClick}
      type="button"
      className="text-lg md:text-2xl pb-4 md:pb-8"
    >
      play with power-ups
    </Button>
  )
}

export default PowerUpsButton