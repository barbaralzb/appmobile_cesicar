import { Platform } from 'react-native';
let PlatformServer;

const PhysicalDeviceIOS = false;
const PhysicalDeviceAndroid = true;
const MyIPV4 = "192.168.43.167";
export const PRODUCTION = false

export const coordenatesCesi = { latitude : 49.3823994, longitude: 1.0725815 }



const HostIOS = PhysicalDeviceIOS ? MyIPV4 : "localhost"
const HostAndroid = PhysicalDeviceAndroid ? MyIPV4 : "127.0.0.1"


Platform.OS === 'ios' ? (PlatformServer = `http://${HostIOS}:8000`) : (PlatformServer = `http://${HostAndroid}:8000`)

export const ServerUrl = PlatformServer;

export const AuthApi = "/api/login"
export const TravelsApi = "/api/travels"
