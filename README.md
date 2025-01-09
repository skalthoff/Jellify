# Jellify
![Jellify App Icon](assets/icon_60pt_3x.jpg)

A music player for Jellyfin powered by React Native. 

### Background
I wanted to create a music app that could handle extremely large music libraries (i.e., 100K+ songs) and not get bogged down. I also wanted to design this app with me and my dad in mind, since I wanted to give him a sleek, one stop shop for live recordings of bands he likes (read: Grateful Dead tapes).

Designed to be lightweight, fast, and support ***extremely*** large music libraries (i.e., > 100K songs). *Jellify* caters to those who want a music player experience similar to what's provided by music streaming services. 

## Features
### Current
- Home screen access to previously played tracks
- Full Last.FM Plugin support

### Roadmap
- Full playlist support, including creating, updating, and reordering
- Library of Favorited Music, not too dissimilar to how streaming services handle your 'library'
- Quick access to similar artists and items for discovering music in your library
- CarPlay / Android Auto Support
- Support for Jellyfin mixes

## Built with:
### Frontend
[React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- Specifically Material Community Icons
[React Native CarPlay](https://github.com/birkir/react-native-carplay)

### Backend
[Jellyfin SDK](https://typescript-sdk.jellyfin.org/)\
[Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/react-native)\
[React Native Track Player](https://github.com/doublesymmetry/react-native-track-player)\

### Logging
[GlitchTip](https://glitchtip.com/) 
- Captures anonymous logging if and only if the user opts into it. This can be toggled at anytime

### Love
This is undoubtedly a passion project of [mine](https://github.com/anultravioletaurora), and I've learned a lot from working on it (and the many failed attempts before it). I hope you enjoy using it! Feature requests and bug reports are welcome :)