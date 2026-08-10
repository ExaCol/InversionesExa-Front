# Inversiones Exa

Este es un frontend creado con Expo, para correr el entorno de ejecución seguir los siguientes pasos:

## Primer paso

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Correr la aplicación (solamente para web)

   ```bash
   npx expo start
   ```

Cuando esté corriendo se puede ver la aplicación web desde localhost:8081. Sin embargo, para dispositivos móviles puede caber la posibilidad que no funcione el QR que redirija a Metro, cuando ocurra esto, ejecutar el siguiente comando:

```bash
npx expo run:android
```

Una vez utilice este comando puede durar hasta 20 minutos en configurarse el build de la aplicativo por primera vez, el resto de veces toma aproximadamente 10 segundos.

Recomendación: No funcionara la aplicación si tienen el puerto 8081 bloqueado o alguna VPN como ZeroTier activa, por lo que es recomendable tener esto en cuenta antes de ejecutar la aplicación DESDE DISPOSITIVOS ANDROID

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
