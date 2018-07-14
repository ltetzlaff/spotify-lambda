const enum Scope {
  UserReadPrivate = "user-read-private",
  UserReadBirthdate = "user-read-birthdate",
  UserReadEmail = "user-read-email",
  PlaylistModifyPrivate = "playlist-modify-private",
  PlaylistReadPrivate = "playlist-read-private",
  PlaylistReadCollaborative = "playlist-read-collaborative",
  PlaylistModifyPublic = "playlist-modify-public",
  UserFollowModify = "user-follow-modify",
  UserFollowRead = "user-follow-read",
  AppRemoteControl = "app-remote-control",
  UserReadCurrentlyPlaying = "user-read-currently-playing",
  UserModifyPlaybackState = "user-modify-playback-state",
  UserReadPlaybackState = "user-read-playback-state",
  UserLibraryModify = "user-library-modify",
  UserLibraryRead = "user-library-read",
  UserReadRecentlyPlayed = "user-read-recently-played",
  UserTopRead = "user-top-read"
}

export default Scope
