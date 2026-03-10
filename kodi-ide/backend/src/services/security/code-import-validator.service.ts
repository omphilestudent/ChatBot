import { IdeFingerprintService } from './ide-fingerprint.service';

interface IdeFingerprint {
  ide: string;
}

interface ImportValidation {
  valid: boolean;
  reason?: string;
  details?: string;
  suggestions?: string[];
}

export class CodeImportValidatorService {
  constructor(private fingerprintService: IdeFingerprintService) {}

  async validateCodeImport(content: string, _source: string): Promise<ImportValidation> {
    const fingerprint = this.extractIdeFingerprint(content);

    if (fingerprint && fingerprint.ide !== 'KODI') {
      return {
        valid: false,
        reason: 'Code was modified using a different IDE',
        details: `Last modified by: ${fingerprint.ide}`
      };
    }

    return { valid: true };
  }

  private extractIdeFingerprint(content: string): IdeFingerprint | null {
    const idePattern = /@kodi-ide-([a-f0-9]+)/;
    const match = content.match(idePattern);

    if (match) {
      return this.fingerprintService.validateFingerprint(match[1]);
    }
    return null;
  }
}
