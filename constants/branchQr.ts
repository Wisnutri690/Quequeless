import { MOCK_BRANCHES } from './mockData';
import { Branch } from '../types';

const rawAppUrl = process.env.EXPO_PUBLIC_APP_URL || 'https://queue.wisnutri.my.id';
const sanitizedAppUrl = rawAppUrl.replace(/\/+$/, '');

export const BASE_QR_URL = `${sanitizedAppUrl}/branch`;
export const BASE_DEEP_LINK = 'queueless://branch';


export function generateBranchQrPayload(branchId: string, format: 'url' | 'deeplink' = 'url'): string {
  if (format === 'deeplink') {
    return `${BASE_DEEP_LINK}/${branchId}`;
  }
  return `${BASE_QR_URL}/${branchId}`;
}

export function parseBranchQrPayload(rawPayload: string): Branch | null {
  if (!rawPayload || typeof rawPayload !== 'string') return null;

  const trimmed = rawPayload.trim();

  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const parsed = JSON.parse(trimmed);
      const targetId = parsed.branchId || parsed.branch_id || parsed.id;
      if (targetId) {
        const found = MOCK_BRANCHES.find((b) => b.id.toLowerCase() === String(targetId).toLowerCase());
        if (found) return found;
      }
    } catch {
    }
  }

  let slug = trimmed;
  if (trimmed.includes('/branch/')) {
    const parts = trimmed.split('/branch/');
    slug = parts[parts.length - 1].split('?')[0].split('#')[0];
  } else if (trimmed.includes('://')) {
    const path = trimmed.split('://')[1];
    const pathParts = path.split('/');
    slug = pathParts[pathParts.length - 1];
  }

  const cleanSlug = slug.toLowerCase().trim();

  return (
    MOCK_BRANCHES.find(
      (b) =>
        b.id.toLowerCase() === cleanSlug ||
        b.shortName.toLowerCase().includes(cleanSlug) ||
        b.city.toLowerCase() === cleanSlug ||
        (cleanSlug.includes('depok') && b.id === 'branch-depok') ||
        (cleanSlug.includes('sudirman') && b.id === 'branch-sudirman') ||
        (cleanSlug.includes('bogor') && b.id === 'branch-bogor')
    ) || null
  );
}
