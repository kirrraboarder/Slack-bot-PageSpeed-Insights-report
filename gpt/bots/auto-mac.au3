; Wait for 3 seconds
Sleep(3000)

; Open Chrome
Run("C:\Program Files\Google\Chrome\Application\chrome.exe")

; Wait for 5 seconds
Sleep(5000)

; Maximize the Chrome window
WinSetState("Chrome", "", @SW_MAXIMIZE)
