/**
 * Google Analytics 4 (GA4) Utility
 * Measurement ID: G-XGSPQKGTQD
 */

const GA_MEASUREMENT_ID = 'G-XGSPQKGTQD';

function sendGtag(...args) {
  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      window.gtag(...args);
    } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(args);
    }
  }
}

export function trackPageView(pageTitle, pagePath) {
  try {
    const formattedPath = pagePath ? (pagePath.startsWith('/') ? pagePath : '/' + pagePath) : window.location.pathname;
    const origin = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://bibliasagradaavemaria.com.br';
    const fullLocation = origin + formattedPath;

    // Atualiza o título do documento
    if (typeof document !== 'undefined' && pageTitle) {
      document.title = `${pageTitle} • Bíblia Sagrada Católica`;
    }

    // 1. Envia page_view padrão do GA4
    sendGtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: fullLocation,
      page_path: formattedPath,
      send_to: GA_MEASUREMENT_ID
    });

    // 2. Envia screen_view para relatórios móveis / PWA do Google Analytics
    sendGtag('event', 'screen_view', {
      app_name: 'Biblia Sagrada Catolica',
      screen_name: pageTitle,
      send_to: GA_MEASUREMENT_ID
    });

    // Log para depuração
    // console.log(`[GA4 Track] PageView: "${pageTitle}" (${formattedPath})`);
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar page_view:', err);
  }
}

export function trackEvent(eventName, eventParams = {}) {
  try {
    sendGtag('event', eventName, {
      ...eventParams,
      send_to: GA_MEASUREMENT_ID
    });
    // console.log(`[GA4 Track] Event: "${eventName}"`, eventParams);
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar evento:', err);
  }
}
