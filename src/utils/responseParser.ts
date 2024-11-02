import { WebhookResponse } from '../types/content';

export const parseResponse = (data: string | object): string => {
  try {
    if (typeof data === 'object') {
      const response = data as WebhookResponse;
      return response.response || response.content || response.message || response.text || JSON.stringify(response);
    }

    if (typeof data === 'string') {
      try {
        const jsonData = JSON.parse(data) as WebhookResponse;
        return jsonData.response || jsonData.content || jsonData.message || jsonData.text || data;
      } catch {
        if (data.trim().startsWith('<?xml') || data.trim().startsWith('<')) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          return xmlDoc.documentElement.textContent || data;
        }
        return data;
      }
    }

    return String(data);
  } catch (error) {
    console.error('Response parsing error:', error);
    throw new Error('Failed to parse response data');
  }
};