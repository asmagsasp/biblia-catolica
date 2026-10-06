/**
 * Google Analytics 4 (GA4) Utility
 * Measurement ID: G-XGSPQKGTQD
 */

export function trackPageView(pageTitle, pagePath) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath || window.location.pathname
      });
    }
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar page_view:', err);
  }
}

export function trackEvent(eventName, eventParams = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  } catch (err) {
    console.warn('[Analytics] Erro ao registrar evento:', err);
  }
}
