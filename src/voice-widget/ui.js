/**
 * Voice Widget UI (Vite)
 */

export class VoiceWidgetUI {
  constructor(voiceWidgetCore) {
    this.voiceWidget = voiceWidgetCore;
    this.containerId = 'voice-widget-root';
    this.elements = {};
  }

  render() {
    const widgetHTML = `
      <div id="voice-widget-container" class="voice-widget-container">
        <button id="voice-widget-fab" class="voice-widget-fab" aria-label="Abrir asistente de voz">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </button>

        <div id="voice-widget-panel" class="voice-widget-panel voice-widget-hidden">
          <div class="voice-widget-header">
            <div class="voice-widget-header-content">
              <button id="voice-widget-close" class="voice-widget-close-btn" aria-label="Cerrar">&times;</button>
              <div class="voice-widget-header-left">
                <div class="voice-widget-header-text">
                  <h3>Asistente UCV</h3>
                  <p>Elige cómo quieres comunicarte</p>
                </div>
                <div class="voice-widget-status">
                  <div class="voice-widget-status-dot"></div>
                  <span class="voice-widget-status-text">Listo para conversar</span>
                </div>
              </div>
            </div>
          </div>

          <div id="voice-widget-messages" class="voice-widget-messages"></div>

          <div id="voice-widget-text-input" class="voice-widget-text-input voice-widget-hidden">
            <div class="voice-widget-input-container">
              <input type="text" id="voice-widget-input-field" placeholder="Escribe tu mensaje..." class="voice-widget-input" />
              <button id="voice-widget-send-btn" class="voice-widget-send-btn" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="voice-widget-controls">
            <div class="voice-widget-controls-card">
              <div class="voice-widget-controls-content">
                <div class="voice-widget-controls-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                  <div>
                    <p class="voice-widget-controls-title">Conversacion por voz</p>
                    <p class="voice-widget-controls-subtitle">Habla directamente con el asistente IA</p>
                  </div>
                </div>
                <div class="voice-widget-controls-buttons">
                  <button id="voice-widget-mic-btn" class="voice-widget-control-btn voice-widget-mic-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </button>
                  <button id="voice-widget-call-btn" class="voice-widget-call-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>Iniciar llamada</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="voice-widget-no-config-msg" class="voice-widget-no-config voice-widget-hidden">
El asistente de voz estará disponible en breve. Mientras tanto puedes usar el chat de texto o WhatsApp.
          </div>
        </div>

        <div id="voice-widget-toast" class="voice-widget-toast voice-widget-hidden">
          <div class="voice-widget-toast-content">
            <strong id="voice-widget-toast-title"></strong>
            <p id="voice-widget-toast-message"></p>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById(this.containerId) || document.body;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = widgetHTML;
    container.appendChild(wrapper.firstElementChild);
    this.cacheElements();
  }

  cacheElements() {
    this.elements = {
      fab: document.getElementById('voice-widget-fab'),
      panel: document.getElementById('voice-widget-panel'),
      closeBtn: document.getElementById('voice-widget-close'),
      messages: document.getElementById('voice-widget-messages'),
      textInput: document.getElementById('voice-widget-text-input'),
      textField: document.getElementById('voice-widget-input-field'),
      sendBtn: document.getElementById('voice-widget-send-btn'),
      callBtn: document.getElementById('voice-widget-call-btn'),
      muteBtn: document.getElementById('voice-widget-mic-btn'),
      statusDot: document.querySelector('.voice-widget-status-dot'),
      statusText: document.querySelector('.voice-widget-status-text'),
      noConfigMsg: document.getElementById('voice-widget-no-config-msg'),
      toast: document.getElementById('voice-widget-toast'),
      toastTitle: document.getElementById('voice-widget-toast-title'),
      toastMessage: document.getElementById('voice-widget-toast-message'),
    };
  }

  attachEventListeners() {
    if (this.elements.fab) this.elements.fab.addEventListener('click', () => { this.voiceWidget.toggleWidget(); });
    if (this.elements.closeBtn) this.elements.closeBtn.addEventListener('click', () => { this.voiceWidget.toggleWidget(); });
    if (this.elements.callBtn) this.elements.callBtn.addEventListener('click', () => {
      const isConnected = this.voiceWidget.refs.sessionActive;
      if (isConnected) this.voiceWidget.stopVoiceCall(); else this.voiceWidget.startVoiceCall();
    });
    if (this.elements.muteBtn) this.elements.muteBtn.addEventListener('click', () => { this.voiceWidget.toggleMute(); });
    if (this.elements.sendBtn) this.elements.sendBtn.addEventListener('click', () => { this.handleTextSubmit(); });
    if (this.elements.textField) {
      this.elements.textField.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleTextSubmit(); });
      this.elements.textField.addEventListener('input', () => { if (this.voiceWidget.refs.session?.conversation?.sendUserActivity) { this.voiceWidget.refs.session.conversation.sendUserActivity(); } });
    }
  }

  handleTextSubmit() {
    const message = this.elements.textField.value.trim();
    if (message) { this.voiceWidget.sendTextMessage(message); this.clearTextInput(); }
  }

  togglePanel(isOpen) {
    if (isOpen) { this.elements.panel.classList.remove('voice-widget-hidden'); this.elements.panel.classList.add('voice-widget-open'); }
    else { this.elements.panel.classList.add('voice-widget-hidden'); this.elements.panel.classList.remove('voice-widget-open'); }
  }

  showTextInput(show) {
    if (show) this.elements.textInput.classList.remove('voice-widget-hidden');
    else this.elements.textInput.classList.add('voice-widget-hidden');
  }

  updateMessages(messages, isTyping = false) {
    this.elements.messages.innerHTML = messages.map(msg => `
      <div class="voice-widget-message voice-widget-message-${msg.type}">
        <div class="voice-widget-message-bubble">
          <p>${this.escapeHtml(msg.text)}</p>
          <span class="voice-widget-message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    `).join('');
    if (isTyping) {
      this.elements.messages.innerHTML += `
        <div class="voice-widget-message voice-widget-message-assistant">
          <div class="voice-widget-message-bubble">
            <div class="voice-widget-typing-indicator"><span></span><span></span><span></span></div>
          </div>
        </div>
      `;
    }
    this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
  }

  updateStatus(status, hasConfig) {
    const statusDot = this.elements.statusDot;
    const statusText = this.elements.statusText;
    const callBtn = document.getElementById('voice-widget-call-btn');
    const micBtn = document.getElementById('voice-widget-mic-btn');
    const noConfigMsg = document.getElementById('voice-widget-no-config-msg');
    if (statusDot && statusText) {
      switch (status) {
        case 'connected':
          statusDot.style.background = 'var(--voice-widget-success)';
          statusText.textContent = 'Conversacion activa';
          if (callBtn) { callBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>Terminar</span>'; callBtn.classList.add('voice-widget-call-btn-active'); }
          if (micBtn) micBtn.style.display = 'flex';
          break;
        case 'connecting':
        case 'getting-token':
          statusDot.style.background = 'var(--voice-widget-warning)';
          statusText.textContent = status === 'connecting' ? 'Conectando...' : 'Obteniendo token...';
          if (callBtn) { callBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>Conectando...</span>'; callBtn.classList.remove('voice-widget-call-btn-active'); }
          if (micBtn) micBtn.style.display = 'none';
          break;
        case 'error':
          statusDot.style.background = 'var(--voice-widget-danger)';
          statusText.textContent = 'Error de conexion';
          if (callBtn) { callBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>Iniciar llamada</span>'; callBtn.classList.remove('voice-widget-call-btn-active'); }
          if (micBtn) micBtn.style.display = 'none';
          break;
        default:
          statusDot.style.background = 'rgba(255, 255, 255, 0.7)';
          statusText.textContent = hasConfig ? 'Listo para conversar' : 'Configuracion pendiente';
          if (callBtn) { callBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>Iniciar llamada</span>'; callBtn.classList.remove('voice-widget-call-btn-active'); }
          if (micBtn) micBtn.style.display = 'none';
      }
    }
    if (noConfigMsg) { if (!hasConfig && status !== 'connected') noConfigMsg.classList.remove('voice-widget-hidden'); else noConfigMsg.classList.add('voice-widget-hidden'); }
  }

  updateMuteButton(isMuted) {
    const micBtn = document.getElementById('voice-widget-mic-btn');
    if (micBtn) {
      const unmutedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>`;
      const mutedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 9v3a3 3 0 0 0 5.12 2.12"></path><path d="M15 9.34V5a3 3 0 0 0-5.11-2.12"></path><path d="M19 10v2a7 7 0 0 1-10.59 5.8"></path><path d="M5 10v2a7 7 0 0 0 7 7"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      if (isMuted) { micBtn.classList.add('muted'); micBtn.innerHTML = mutedIcon; micBtn.setAttribute('aria-label', 'Activar microfono'); }
      else { micBtn.classList.remove('muted'); micBtn.innerHTML = unmutedIcon; micBtn.setAttribute('aria-label', 'Silenciar microfono'); }
      micBtn.setAttribute('aria-pressed', String(isMuted));
    }
  }

  showTypingIndicator(isTyping) {
    const statusText = this.elements.statusText;
    if (statusText && isTyping) statusText.textContent = 'Escribiendo...';
  }

  clearTextInput() { this.elements.textField.value = ''; }

  escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
}


