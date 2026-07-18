# Privacy Policy for YTPA – YouTube Play All

[//]: # (AI generated slopfile to make the Chrome store happy)

Effective date: 18 July 2026

YTPA – YouTube Play All ("YTPA") is a browser extension maintained by Robert
Wesner. It adds Play All and related playback controls to YouTube channel and
playlist pages.

This policy explains what information YTPA handles, why it handles it, where
that information is stored, and when information is transmitted from the
browser. It applies to the Chrome and Firefox versions of the standalone YTPA
extension.

## Summary

- YTPA does not create user accounts.
- YTPA does not use analytics, advertising, tracking pixels, or behavioral
  profiling.
- YTPA does not sell user data.
- Most processing takes place locally in the browser.
- An external playlist service is contacted only when fallback playlist
  emulation is required for an exceptionally large playlist.

## Information processed locally

### YouTube page and browsing information

On supported `youtube.com` pages, YTPA reads the current page URL and the page
content required to identify channels, playlists, videos, Shorts, and live
streams and to add its playback controls. Depending on the page and feature,
this can include public channel, playlist, and video identifiers, titles,
links, and playback state.

This information is used only to provide YTPA's user-facing playback features.
YTPA does not build or retain a general history of websites the user visits and
does not operate outside its declared YouTube host permissions.

### Extension settings

YTPA stores the user's settings in the browser's local extension storage so
that the selected preferences persist between sessions. These settings remain
on the user's device and are not transmitted to the developer.

### Random-play state

When a user enables YTPA's random-play feature, YTPA stores the relevant public
playlist and video identifiers together with watched/not-watched state in the
YouTube origin's local storage. This prevents already played entries from being
selected repeatedly. This information remains on the user's device and is not
transmitted to the developer by this feature.

## Fallback playlist service

In the exceptional case where YouTube cannot provide all entries of a very
large playlist through the page itself, YTPA sends an HTTPS `POST` request to:

`https://ytplaylist.robert.wesner.io/api/list`

The request contains only:

- the public YouTube playlist URL, including its playlist identifier; and
- a request-type string containing the YTPA version.

The request is made without browser credentials. YTPA does not send YouTube
cookies, authentication tokens, extension settings, or a user's Google account
identity to this service. The service returns playlist data used to emulate the
playlist; it does not provide executable extension code.

As with any HTTPS request, the service and its hosting infrastructure receive
technical network information necessary to deliver and secure the request,
such as the IP address, User-Agent, timestamp, and request metadata. Technical
access or security logs may process this information in accordance with the
[general data protection notice](https://datenschutz.robertwesner.de/dataprotection).

The fallback request and its technical metadata are used only to provide,
maintain, and secure the fallback playlist feature. They are not used for
advertising, cross-site tracking, or profiling.

## Sharing and third parties

YTPA does not sell user data or share it with advertising platforms, data
brokers, or information resellers. Information is transferred only when
necessary to provide the extension's disclosed single purpose, to operate and
secure the fallback service, to comply with applicable law, or to investigate
abuse or security incidents.

YTPA operates on YouTube, a service provided by Google. The user's use of
YouTube remains subject to Google's own terms and privacy policy. Infrastructure
providers involved in delivering the fallback service may process the limited
technical request data described above on behalf of the service operator.

## Retention and deletion

- Extension settings remain in local extension storage until the user resets
  them, clears the extension's data, or uninstalls the extension.
- Random-play state remains in YouTube local storage until YTPA removes it or
  the user clears the relevant YouTube site data.
- The fallback service does not create a YTPA user account or a user profile.
  Retention applicable to technical infrastructure logs is described in the
  [general data protection notice](https://datenschutz.robertwesner.de/dataprotection).

Users can delete locally stored information through YTPA's reset controls and
their browser's extension-data and site-data controls. Requests concerning data
handled by the fallback service can be submitted using the contact information
in the general data protection notice linked above.

## Data security

Communications with YouTube and the fallback playlist service use HTTPS. YTPA
requests only the browser permissions necessary for its playback features and
does not download or execute remote JavaScript or WebAssembly.

## Chrome Web Store Limited Use

YTPA's use and transfer of information complies with the Chrome Web Store User
Data Policy, including its Limited Use requirements. Information handled by
YTPA is used only to provide or improve the extension's single purpose and
related security and operational functions.

## Changes to this policy

This policy may be updated when YTPA's functionality or data practices change.
Material changes will be reflected in this document and its effective date.

## Contact

The extension is maintained by Robert Wesner. Contact details and information
about data-protection rights are available in the
[general data protection notice](https://datenschutz.robertwesner.de/dataprotection).
