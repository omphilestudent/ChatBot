interface IdeFingerprint {
  ide: string;
}

export class IdeFingerprintService {
  validateFingerprint(_token: string): IdeFingerprint {
    return { ide: 'KODI' };
  }
}
