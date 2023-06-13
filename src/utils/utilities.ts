import { PermissionsAndroid, Platform } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

const DEFAULT_IMAGE_SIZE = 300;

export default {
  checkStoragePermission: () => {
    return new Promise((onOk, onErr) => {
      if (Platform.OS == 'ios') return onOk(true);
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        .then((result: any) => {
          if (result && result !== 'denied') {
            onOk(result);
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
              .then((result) => {
                if (result && result !== 'denied') {
                  onOk(result);
                } else {
                  console.log('12345')
                }
              });
          }
        });
    });
  },
  checkCamPermission: () => {
    return new Promise((onOk, onErr) => {
      if (Platform.OS == 'ios') return onOk(true);
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((result: any) => {
          if (result && result !== 'denied') {
            onOk(result);
          } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
              .then((result) => {
                if (result && result !== 'denied') {
                  onOk(result);
                } else {
                  console.log('check cam permission error')
                }
              });
          }
        });
      } else {
        onOk(true);
      }
    });
  },
  pickerImage: (crop, ratio, multi, width = DEFAULT_IMAGE_SIZE, height = DEFAULT_IMAGE_SIZE, includeBase64 = false) => {
    let w = width;
    let h = height;
    if (ratio) {
      try {
        w = h * eval(ratio);
      } catch (error) {
        console.log('error when picker image', error);
      }
    }
    ImagePicker.clean().catch(e => console.log('openCamera clean up error', e));
    console.log(`Width = ${w}, height = ${h}`);
    return new Promise(resolve => {
      ImagePicker.openPicker({
        width: w,
        height: h,
        cropping: crop,
        includeBase64: includeBase64,
        multiple: multi,
        compressImageQuality: 0.5
      }).then(image => resolve(image)).catch(error => {
        console.log('error when pick image', error.code);
      });
    });
  },
  openCamera: (crop, ratio, width = DEFAULT_IMAGE_SIZE, height = DEFAULT_IMAGE_SIZE) => {
    let w = width;
    let h = height;
    if (ratio) {
      try {
        w = h * eval(ratio);
      } catch (error) {
        console.log('error when picker image', error);
      }
    }
    ImagePicker.clean().catch(e => console.log('openCamera clean up error', e));
    console.log(`Width = ${w}, height = ${h}`);
    return new Promise(resolve => {
      ImagePicker.openCamera({
        cropping: crop,
        width: w,
        height: h,
        includeBase64: false
      }).then(image => {
        resolve(image)
      }).catch(error => {
        console.log('error when capture image', error);
      });
    })
  },
}