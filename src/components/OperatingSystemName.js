import React from "react"

const OperatingSystemName = () => {
  let OSName = "Unknown OS"
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows"
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS"
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX"
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux"
  if (navigator.appVersion.indexOf("iOS") != -1) OSName = "iOS"
  if (navigator.appVersion.indexOf("IOS") != -1) OSName = "IOS"
  return (
    <>
      <p className="center">Your operating system is: {OSName}</p>
    </>
  )
}

export default OperatingSystemName
