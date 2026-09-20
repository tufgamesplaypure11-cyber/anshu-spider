export interface Track {
  id: number;
  title: string;
  link: string;
  type: string;
}

export interface GameVoteData {
  bgmi: number;
  ff: number;
  mc: number;
}

export type StripeKey = 'nature' | 'music' | 'food' | 'chills';

export interface StripeItem {
  name: string;
  note: string;
}

export interface StripeModalConfig {
  badge: string;
  badgeClass: string;
  cardBorder: string;
  title: string;
  subtitle: string;
  input1Label: string;
  input1Placeholder: string;
  input2Label: string;
  input2Placeholder: string;
  btnLabel: string;
  btnClass: string;
  itemPillClass: string;
}
