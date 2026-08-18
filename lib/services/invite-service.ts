/**
 * Invite Service Abstraction
 * 
 * Provides clean decoupling between UI components and backend invitation generation.
 * Handles Web Share API interactions with graceful fallbacks.
 */

export interface InviteShareData {
  title: string;
  text: string;
  url: string;
}

class InviteService {
  private getBaseUrl(): string {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://hoekdex.app';
  }

  /**
   * Generate an invite link for onboarding new friends.
   * Architecture allows swapping this with a backend endpoint call when real tokens are implemented.
   */
  public generateInviteUrl(referrerUserId: string = 'user_curr_01'): string {
    const mockToken = `invite_${referrerUserId}_${Math.random().toString(36).substring(2, 9)}`;
    return `${this.getBaseUrl()}/signup?ref=${mockToken}`;
  }

  /**
   * Generate a public profile share link.
   * Exposes ONLY public display info (@username or userId).
   */
  public generateProfileShareUrl(username: string = 'mukesh_k'): string {
    const cleanUsername = username.replace(/^@/, '');
    return `${this.getBaseUrl()}/profile/${encodeURIComponent(cleanUsername)}`;
  }

  /**
   * Triggers native Web Share API if supported by the browser,
   * otherwise falls back to copying the link to the user's clipboard.
   * 
   * Returns { shared: boolean, copied: boolean }
   */
  public async shareInvite(data?: Partial<InviteShareData>): Promise<{ shared: boolean; copied: boolean }> {
    const shareUrl = data?.url || this.generateInviteUrl();
    const payload: InviteShareData = {
      title: data?.title || 'Join me on Hoekdex!',
      text: data?.text || 'Track milestones, build your crew, and compare XP on Hoekdex.',
      url: shareUrl,
    };

    // Attempt Web Share API first
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(payload);
        return { shared: true, copied: false };
      } catch (err) {
        // User cancelled or share failed — fall back to copy if not user cancellation
        if ((err as Error).name === 'AbortError') {
          return { shared: false, copied: false };
        }
      }
    }

    // Fallback: Copy to clipboard
    const copySuccess = await this.copyToClipboard(payload.url);
    return { shared: false, copied: copySuccess };
  }

  /**
   * Helper to safely copy text to the clipboard across all browser engines.
   */
  public async copyToClipboard(text: string): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard writeText failed, falling back to execCommand:', err);
      }
    }

    // Fallback for older browsers / iframe security contexts
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (e) {
      console.error('Copy to clipboard failed:', e);
      return false;
    }
  }
}

export const inviteService = new InviteService();
