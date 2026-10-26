// src/sleepTimerService.js
// Timer de Sono (Sleep Timer) para áudio da Bíblia, Rosário, Rádios e Podcasts
// Desliga suavemente as narrações e transmissões para adormecer em paz sem esgotar a bateria.

let sleepTimerInterval = null;
let sleepTimerState = {
  active: false,
  mode: null, // 'time' | 'end_of_reading'
  durationMinutes: 0,
  remainingSeconds: 0,
  fadeStarted: false
};

const listeners = new Set();

/**
 * Inscreve um callback para ser notificado de atualizações de estado do timer
 */
export function subscribeSleepTimer(callback) {
  listeners.add(callback);
  callback(getSleepTimerState());
  return () => listeners.delete(callback);
}

function emitState() {
  const state = getSleepTimerState();
  listeners.forEach(cb => {
    try { cb(state); } catch (e) { console.error('[SleepTimer] Callback error:', e); }
  });
  updateGlobalTimerBadges(state);
}

export function getSleepTimerState() {
  return { ...sleepTimerState };
}

/**
 * Inicia o timer com uma duração em minutos ou modo 'end_of_reading'
 */
export function startSleepTimer(minutes, mode = 'time') {
  clearSleepTimerInternal();

  if (mode === 'end_of_reading') {
    sleepTimerState = {
      active: true,
      mode: 'end_of_reading',
      durationMinutes: 0,
      remainingSeconds: 0,
      fadeStarted: false
    };
    emitState();
    if (typeof window.showToast === 'function') {
      window.showToast('🌙 Timer ativado: O áudio desligará ao fim da leitura.');
    }
    updateTimerModalView();
    return;
  }

  const mins = Math.max(1, parseInt(minutes) || 15);
  const totalSeconds = mins * 60;

  sleepTimerState = {
    active: true,
    mode: 'time',
    durationMinutes: mins,
    remainingSeconds: totalSeconds,
    fadeStarted: false
  };

  emitState();

  if (typeof window.showToast === 'function') {
    window.showToast(`🌙 Timer de sono ativado para ${mins} minutos.`);
  }

  sleepTimerInterval = setInterval(() => {
    if (!sleepTimerState.active || sleepTimerState.mode !== 'time') {
      clearSleepTimerInternal();
      return;
    }

    sleepTimerState.remainingSeconds--;

    // Fade out suave nos últimos 5 segundos se houver streaming tocando
    if (sleepTimerState.remainingSeconds <= 5 && !sleepTimerState.fadeStarted) {
      sleepTimerState.fadeStarted = true;
      applySmoothAudioFadeOut(5);
    }

    if (sleepTimerState.remainingSeconds <= 0) {
      triggerSleepTimerStop();
    } else {
      emitState();
    }
  }, 1000);

  updateTimerModalView();
}

/**
 * Adiciona minutos adicionais ao timer ativo
 */
export function addSleepTimerMinutes(extraMinutes = 15) {
  if (!sleepTimerState.active) {
    startSleepTimer(extraMinutes, 'time');
    return;
  }

  if (sleepTimerState.mode === 'end_of_reading') {
    startSleepTimer(extraMinutes, 'time');
    return;
  }

  const extraSec = extraMinutes * 60;
  sleepTimerState.remainingSeconds += extraSec;
  sleepTimerState.durationMinutes += extraMinutes;
  sleepTimerState.fadeStarted = false;

  emitState();
  updateTimerModalView();

  if (typeof window.showToast === 'function') {
    window.showToast(`🌙 +${extraMinutes} min adicionados ao Timer de Sono.`);
  }
}

/**
 * Cancela o timer de sono
 */
export function cancelSleepTimer() {
  clearSleepTimerInternal();
  sleepTimerState = {
    active: false,
    mode: null,
    durationMinutes: 0,
    remainingSeconds: 0,
    fadeStarted: false
  };
  emitState();
  updateTimerModalView();

  if (typeof window.showToast === 'function') {
    window.showToast('Timer de sono desativado.');
  }
}

function clearSleepTimerInternal() {
  if (sleepTimerInterval) {
    clearInterval(sleepTimerInterval);
    sleepTimerInterval = null;
  }
}

/**
 * Notifica que a leitura atual (capítulo ou dia do plano) terminou
 */
export function notifyReadingFinished() {
  if (sleepTimerState.active && sleepTimerState.mode === 'end_of_reading') {
    triggerSleepTimerStop();
  }
}

/**
 * Executa a parada total do áudio com mensagem carinhosa de sono
 */
function triggerSleepTimerStop() {
  clearSleepTimerInternal();
  sleepTimerState.active = false;
  sleepTimerState.mode = null;
  sleepTimerState.remainingSeconds = 0;
  emitState();
  updateTimerModalView();

  // 1. Para TTS (leitura de capítulos, versículos, liturgia, homilias, plano)
  if (typeof window.stopSpeech === 'function') {
    try { window.stopSpeech(); } catch (e) {}
  }

  // 2. Para Streaming de Rádio e Podcasts
  if (typeof window.stopAudioService === 'function') {
    try { window.stopAudioService(); } catch (e) {}
  }

  // 3. Para Rosário se estiver falando
  if (typeof window.stopRosarioSpeech === 'function') {
    try { window.stopRosarioSpeech(); } catch (e) {}
  }

  if (typeof window.showToast === 'function') {
    window.showToast('🌙 Timer de sono concluído. Que Deus abençoe seu descanso em paz!');
  }
}

/**
 * Diminui gradualmente o volume nos últimos segundos
 */
function applySmoothAudioFadeOut(seconds = 5) {
  try {
    const audioEl = document.querySelector('audio');
    if (!audioEl) return;

    const initialVol = audioEl.volume;
    const stepInterval = 200;
    const totalSteps = (seconds * 1000) / stepInterval;
    let step = 0;

    const fadeTimer = setInterval(() => {
      step++;
      const factor = Math.max(0, 1 - step / totalSteps);
      audioEl.volume = initialVol * factor;

      if (step >= totalSteps) {
        clearInterval(fadeTimer);
        audioEl.volume = initialVol; // restaura padrão para próxima reprodução
      }
    }, stepInterval);
  } catch (e) {
    console.warn('[SleepTimer] Erro fadeout:', e);
  }
}

/**
 * Formata segundos restantes em string MM:SS
 */
export function formatRemainingTime(seconds) {
  if (seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Atualiza todos os badges e botões de timer espalhados pelo aplicativo
 */
function updateGlobalTimerBadges(state) {
  // 1. Badge flutuante
  const floatingBadge = document.getElementById('sleepTimerFloatingBadge');
  const badgeText = document.getElementById('sleepTimerBadgeText');
  if (floatingBadge && badgeText) {
    if (state.active) {
      floatingBadge.classList.remove('hidden');
      if (state.mode === 'end_of_reading') {
        badgeText.textContent = 'Fim da Leitura';
      } else {
        badgeText.textContent = formatRemainingTime(state.remainingSeconds);
      }
    } else {
      floatingBadge.classList.add('hidden');
    }
  }

  // 2. Botão no Mini-Player de Áudio
  const miniBtn = document.getElementById('miniBtnTimer');
  if (miniBtn) {
    miniBtn.classList.toggle('active-timer', state.active);
    if (state.active) {
      miniBtn.title = state.mode === 'end_of_reading' 
        ? 'Timer: Ao fim da leitura' 
        : `Timer: ${formatRemainingTime(state.remainingSeconds)}`;
    } else {
      miniBtn.title = 'Timer de Sono (Desligamento Automático)';
    }
  }

  // 3. Botão na Leitura do Capítulo
  const chapterTimerLabel = document.getElementById('chapterTimerLabel');
  const btnChapterTimer = document.getElementById('btnChapterSleepTimer');
  if (btnChapterTimer) {
    btnChapterTimer.classList.toggle('active-timer', state.active);
  }
  if (chapterTimerLabel) {
    if (state.active) {
      chapterTimerLabel.textContent = state.mode === 'end_of_reading' 
        ? 'Fim Leitura' 
        : formatRemainingTime(state.remainingSeconds);
    } else {
      chapterTimerLabel.textContent = 'Timer';
    }
  }

  // 4. Botão no Plano de Leitura
  const planTimerLabel = document.getElementById('planTimerLabel');
  const btnPlanTimer = document.getElementById('btnPlanSleepTimer');
  if (btnPlanTimer) {
    btnPlanTimer.classList.toggle('active-timer', state.active);
  }
  if (planTimerLabel) {
    if (state.active) {
      planTimerLabel.textContent = state.mode === 'end_of_reading' 
        ? 'Fim Leitura' 
        : formatRemainingTime(state.remainingSeconds);
    } else {
      planTimerLabel.textContent = 'Timer de Sono';
    }
  }
}

/**
 * Abre o Modal do Sleep Timer
 */
export function openSleepTimerModal() {
  const modal = document.getElementById('sleepTimerModal');
  if (!modal) return;
  updateTimerModalView();
  modal.classList.remove('hidden');
}

/**
 * Fecha o Modal do Sleep Timer
 */
export function closeSleepTimerModal() {
  const modal = document.getElementById('sleepTimerModal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Atualiza o conteúdo dentro do modal baseado no estado do timer
 */
export function updateTimerModalView() {
  const activeBox = document.getElementById('sleepTimerActiveBox');
  const presetsBox = document.getElementById('sleepTimerPresetsBox');
  const countdownEl = document.getElementById('sleepTimerCountdown');
  const modeTextEl = document.getElementById('sleepTimerModeText');

  if (!activeBox || !presetsBox) return;

  if (sleepTimerState.active) {
    activeBox.style.display = 'block';
    if (countdownEl) {
      if (sleepTimerState.mode === 'end_of_reading') {
        countdownEl.textContent = 'Ao Fim da Leitura';
        countdownEl.style.fontSize = '24px';
      } else {
        countdownEl.textContent = formatRemainingTime(sleepTimerState.remainingSeconds);
        countdownEl.style.fontSize = '44px';
      }
    }
    if (modeTextEl) {
      modeTextEl.textContent = sleepTimerState.mode === 'end_of_reading'
        ? 'O áudio desligará assim que o último versículo for narrado.'
        : `Duração original: ${sleepTimerState.durationMinutes} minutos`;
    }
  } else {
    activeBox.style.display = 'none';
  }

  // Destaca o botão preset correspondente se houver
  document.querySelectorAll('.sleep-timer-preset-btn').forEach(btn => {
    const mins = parseInt(btn.dataset.minutes);
    const isEndOfReading = btn.dataset.mode === 'end_of_reading';
    
    if (sleepTimerState.active) {
      if (isEndOfReading && sleepTimerState.mode === 'end_of_reading') {
        btn.classList.add('active');
      } else if (!isEndOfReading && sleepTimerState.mode === 'time' && sleepTimerState.durationMinutes === mins) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Trata o clique em um preset (15, 30, 45, 60 min ou fim da leitura)
 */
export function handleSleepTimerPresetClick(btn) {
  if (!btn) return;
  const mode = btn.dataset.mode || 'time';
  if (mode === 'end_of_reading') {
    startSleepTimer(0, 'end_of_reading');
  } else {
    const mins = parseInt(btn.dataset.minutes) || 30;
    startSleepTimer(mins, 'time');
  }
}

/**
 * Trata clique do formulário de minutos personalizados
 */
export function handleCustomSleepTimerSubmit() {
  const input = document.getElementById('customSleepTimerInput');
  if (!input) return;
  const mins = parseInt(input.value);
  if (!mins || mins < 1 || mins > 360) {
    if (typeof window.showToast === 'function') {
      window.showToast('Por favor, informe entre 1 e 360 minutos.');
    }
    return;
  }
  startSleepTimer(mins, 'time');
  input.value = '';
}

// Expõe no window para acesso pelos templates HTML
window.openSleepTimerModal = openSleepTimerModal;
window.closeSleepTimerModal = closeSleepTimerModal;
window.startSleepTimer = startSleepTimer;
window.cancelSleepTimer = cancelSleepTimer;
window.addSleepTimerMinutes = addSleepTimerMinutes;
window.handleSleepTimerPresetClick = handleSleepTimerPresetClick;
window.handleCustomSleepTimerSubmit = handleCustomSleepTimerSubmit;
window.notifyReadingFinished = notifyReadingFinished;
