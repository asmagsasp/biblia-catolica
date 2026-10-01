package com.biblia.catolica;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private boolean keepSplashScreen = true;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Inicializar SplashScreen AndroidX nativa
        SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
        
        // Manter a Splash Screen nativa na tela do Android por 2.0 segundos
        splashScreen.setKeepOnScreenCondition(() -> keepSplashScreen);

        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            keepSplashScreen = false;
        }, 2000);

        super.onCreate(savedInstanceState);
    }
}
