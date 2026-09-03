# Switch Google Account
### Switch between the first two signed-in Google accounts with a click!
This simple extension detects when URLs have the Google `/u/0` or `authuser=0` parameters and lights up.
Once clicked, the extension replaces that part of the URL with the other account (0 or 1) and reloads.

I created this extension because I commonly switch between my personal and school account,
and Google's switcher (clicking profile picture) annoyingly opens a new tab each time you switch.

## Installation
At this time *Switch Google Account* is not available on the Chrome Web Store. 
Please follow the steps below to install on any Chromium browser.

1. **Clone** the repo to your computer
2. Go to `chrome://extensions`
3. Switch on **Developer Mode**
4. Select **Load Unpacked** and open the repo's root folder
5. Accept any permissions. That's it!

## Feature Roadmap
- [x] Clicking switches accounts if URL contains Google account
- [x] Icon changes if Google account is detected in the URL
- [x] Icon changes to show which account is active in this tab
- [x] Added `authuser=`
- [ ] Add authuser to URL if Google account string is not found, but the domain is google.com
    - White icon for this action on click
- [ ] Preload switched URL to detect `403: Forbidden` or `401: Unauthorized` repsonses
    - This is useful when certain Google pages are not accessible from the other account
    - Unavailable icon would show if this is the case
    - Network impact / caching needs to be considered
