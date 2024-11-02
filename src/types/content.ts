export interface WebhookResponse {
  response?: string;
  content?: string;
  message?: string;
  text?: string;
  [key: string]: any;
}

export interface GeneratedContent {
  id?: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}