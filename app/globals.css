'use client';

import { useEffect, useState } from 'react';
import { useAppState } from '@/components/AppStateProvider';

const POPUP_KEY = 'total-energie-popup-seen';

export default function WelcomePopup() {
  const { state } = useAppState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(POPUP_KEY);
    if (!seen) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    localStorage.setItem(POPUP_KEY, '1');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{state.settings.popupTitle}</h3>
        <ul>
          <li>Inscrivez-vous maintenant et recevez 500 FCFA gratuitement.</li>
          <li>Invitez vos amis à investir et gagnez 25% / 3% / 2% sur 3 niveaux.</li>
          <li>Les rendements sont versés automatiquement chaque jour pendant 180 jours.</li>
          <li>Investissez dès 2 000 FCFA et commencez à gagner dès le lendemain.</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
          <button className="primary-btn" onClick={close}>D'accord</button>
          <a href={state.settings.supportLink} target="_blank" rel="noreferrer" className="primary-btn" style={{ background: '#0d7af7' }}>Telegram</a>
        </div>
      </div>
    </div>
  );
}
