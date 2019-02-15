import { ImagePicker, Permissions } from 'expo';

export enum MediaType {
  Camera,
  PhotoLibrary,
}

export const getImageUri = async (
  mediaType: MediaType,
  allowsEditing = false
) => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );

  if (status !== 'granted') return null;

  const mediaMethod =
    mediaType === MediaType.Camera
      ? ImagePicker.launchCameraAsync
      : ImagePicker.launchImageLibraryAsync;

  const result = await mediaMethod({
    allowsEditing,
  });

  if (result.cancelled) return null;

  const { uri } = result;
  return uri;
};
